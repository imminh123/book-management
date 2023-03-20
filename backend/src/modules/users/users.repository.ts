import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Database } from '../../config';
import { UserProfile } from './users.interface';
import { UserDocument } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Database.USER)
    private readonly usersRepository: Model<UserDocument>,
  ) {}

  createUser(data: UserProfile) {
    return this.usersRepository.create(data);
  }

  findUsersById(id: string) {
    return this.usersRepository.findOne({});
  }

  findOne(condition) {
    return this.usersRepository.findOne(condition);
  }

  update(conditon: Partial<UserProfile>, data) {
    return this.usersRepository.updateOne(conditon, { $set: data }).exec();
  }
}
