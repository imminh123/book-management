import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IBook } from '../book.interface';

export class IndexBookFilter implements Partial<IBook> {
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'userId',
  })
  title?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    description: 'author',
  })
  author?: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'number',
    description: 'isbn',
  })
  isbn?: string;
}
