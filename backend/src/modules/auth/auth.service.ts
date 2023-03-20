import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { stringify } from 'querystring';
import { UsersService } from '../users/users.service';
import axios from 'axios';
import { client } from '../../utils/axios';
import { areEqual } from '../../utils/helper';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async handleCallback({ code }, res: Response) {
    const scope = ['identify', 'email'];
    try {
      const { data } = await client.post(
        'https://discord.com/api/oauth2/token',
        stringify({
          client_id: process.env.DISCORD_APP_ID,
          client_secret: process.env.DISCORD_APP_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: `${process.env.DISCORD_REDIRECT_URI}`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      if (!areEqual(scope, data.scope.split(' '))) {
        throw new UnauthorizedException(
          `Expected scope "${scope}" but received scope "${data.scope}`,
        );
      }

      const { data: userData } = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );

      const user = await this.usersService.findOne({ userId: userData.id });
      if (!user) {
        await this.usersService.createUser(userData);
      } else {
        await this.usersService.updateUser(user);
      }

      return data.access_token;
    } catch (err) {
      throw new InternalServerErrorException({ err }, 'Authentication Error');
    }
  }
}
