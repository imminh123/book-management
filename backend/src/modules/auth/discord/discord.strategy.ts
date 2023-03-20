import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.DISCORD_APP_ID,
      clientSecret: process.env.DISCORD_APP_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'email'],
    });
  }
}
