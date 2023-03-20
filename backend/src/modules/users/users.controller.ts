import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    operationId: 'createUser',
    description: 'Create user',
  })
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @ApiOperation({
    operationId: 'readUser',
    description: 'Read user by userId',
  })
  @Get(':userId')
  readUser(@Param('userId') userId: string) {
    return this.usersService.findUsersById(userId);
  }
}
