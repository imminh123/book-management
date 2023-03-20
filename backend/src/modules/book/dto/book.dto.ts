import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IBook } from '../book.interface';

export class BookDto implements IBook {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'author',
    example: 'George Martin',
  })
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Book title',
    example: 'The World of Ice and Fire',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'ISBN Number',
    example: '0553805444',
  })
  isbn: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Description',
    example: 'The fantasy saga of our time',
  })
  description: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Cover',
    example: 'https://example.com/',
  })
  cover: string;
}
