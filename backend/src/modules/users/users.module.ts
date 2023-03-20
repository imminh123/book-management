import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './users.schema';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Database } from '../../config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Database.USER,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
