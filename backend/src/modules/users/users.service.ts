import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UserProfile } from './users.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(user: Partial<UserProfile>): Promise<UserProfile | undefined> {
    return this.usersRepository.findOne(user);
  }

  async updateUser(user: Partial<UserProfile>) {
    return this.usersRepository.update(
      {
        userId: user.userId,
        avatar: `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}`,
        email: user.email,
      },
      user,
    );
  }

  createUser(data: CreateUserDto) {
    const user: UserProfile = {
      ...data,
      username: data.username,
      userId: data.id,
      avatar: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`,
    };

    return this.usersRepository.createUser(user);
  }

  findUsersById(userId: string) {
    return this.usersRepository.findUsersById(userId);
  }
}
