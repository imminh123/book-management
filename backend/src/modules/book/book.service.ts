import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessage } from '../../utils/errors';
import { getPaginateHeaders, IPagination } from '../../utils/pagination';
import { BookRepository } from './books.repository';
import { BookDto } from './dto/book.dto';
import { IndexBookFilter } from './dto/get-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './schema/book.schema';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async createBook(createBookDto: BookDto): Promise<BookDocument> {
    const existBook = await this.bookRepository.findBookByIsbn(
      createBookDto.isbn,
    );

    if (existBook) {
      throw new BadRequestException(ErrorMessage.BOOK_EXISTS);
    }
    try {
      return this.bookRepository.createBook(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessage.BOOK_CREATE_FAILED);
    }
  }

  async indexBook(filters: IndexBookFilter, pagination: IPagination) {
    const options = {
      sort: {
        _id: -1,
      },
      limit: pagination.perPage,
      skip: pagination.startIndex,
    };

    const books = await this.bookRepository.find(filters, options);
    if (!books.length) {
      throw new NotFoundException(ErrorMessage.BOOK_NOT_FOUND);
    }

    const booksCount = await this.bookRepository.count({ ...filters });
    const responseHeaders = getPaginateHeaders(pagination, booksCount);

    return {
      items: books,
      headers: responseHeaders,
    };
  }

  async getBook(bookId: string) {
    const book = await this.bookRepository.findOne({
      _id: bookId,
    });
    if (!book) {
      throw new NotFoundException(ErrorMessage.BOOK_NOT_FOUND);
    }

    return book;
  }

  async getBookByIsbn(isbn: string) {
    const book = await this.bookRepository.findOne({
      isbn,
    });
    if (!book) {
      throw new NotFoundException(ErrorMessage.BOOK_NOT_FOUND);
    }

    return book;
  }

  async updateByIsbn(isbn, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.getBookByIsbn(isbn);
      return this.bookRepository.updateOne({ _id: book._id }, updateBookDto);
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessage.BOOK_UPDATE_FAILED);
    }
  }

  async removeBook(id: string) {
    try {
      await this.getBook(id);
      const removeSuccess = await this.bookRepository.deleteOne({ _id: id });
      return !!removeSuccess;
    } catch (error) {
      throw new InternalServerErrorException(ErrorMessage.BOOK_DELETE_FAILED);
    }
  }
}
