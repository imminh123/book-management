import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './modules/health/health.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    AuthModule,
    BookModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
