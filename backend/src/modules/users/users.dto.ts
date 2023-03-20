import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserProfile } from './users.interface';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'id',
    description: 'id',
  })
  id: string;

  @ApiProperty()
  username: 'Nguyễn Thạc Minh (Marshall)';

  @ApiProperty({
    example: 'tag',
    description: 'tag',
  })
  discriminator: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    example: 'link',
    description: 'Avatar',
  })
  avatar: string;
}
