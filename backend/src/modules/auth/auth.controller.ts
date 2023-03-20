import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query, Request } from 'express';
import { AuthenticatedGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './discord/discord-auth.guard';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {}

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return { msg: 'Login' };
  }

  @Get('/callback')
  async callback(@Query() query, @Res() res: Response) {
    const access_token = await this.authService.handleCallback(query, res);
    return res.redirect(
      `${process.env.CLIENT_DOMAIN}?access_token=${this.jwtService.sign({
        access_token,
      })}`,
    );
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  logout() {
    return {};
  }
}
