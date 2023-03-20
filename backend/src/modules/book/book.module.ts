import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './books.repository';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.SESSION_SECRET,
    }),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService, BookRepository],
})
export class BookModule {}
