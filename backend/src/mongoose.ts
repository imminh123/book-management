import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { DatabaseConfig } from './config';

export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      ...DatabaseConfig(),
    };
  }
}
