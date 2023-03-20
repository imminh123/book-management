import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookRepository } from './books.repository';
import { IndexBookFilter } from './dto/get-book.dto';
import { BookService } from './book.service';
import { ErrorMessage } from '../../utils/errors';
import { IBook } from './book.interface';

describe('BookService', () => {
  let bookService: BookService;
  let bookRepo: BookRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useFactory: jest.fn(() => ({
            findBookByIsbn: jest.fn(),
            createBook: jest.fn(),
            find: jest.fn(),
            count: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          })),
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepo = module.get<BookRepository>(BookRepository);
  });

  describe('createBook', () => {
    let bookSample: IBook;

    beforeEach(() => {
      bookSample = {
        title: 'Test Title',
        author: 'John Smith',
        description: 'Test description',
        isbn: '9783161484100',
        cover: '',
      };
    });

    it('should create the book if the ISBN is valid and book does not exist in the database', async () => {
      bookRepo.findBookByIsbn = jest.fn().mockResolvedValueOnce(false);
      bookRepo.createBook = jest.fn().mockResolvedValueOnce(bookSample);
      const newBook = await bookService.createBook(bookSample);
      expect(newBook).toEqual(bookSample as any);
      expect(bookRepo.findBookByIsbn).toHaveBeenCalledWith('9783161484100');
      expect(bookRepo.createBook).toHaveBeenCalledWith(bookSample as any);
    });

    it('should throw "BadRequestException" when book already exists with given ISBN value', async () => {
      bookRepo.findBookByIsbn = jest.fn().mockResolvedValueOnce(true);
      try {
        await bookService.createBook(bookSample);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(ErrorMessage.BOOK_EXISTS);
        expect(bookRepo.findBookByIsbn).toHaveBeenCalledWith('9783161484100');
        expect(bookRepo.createBook).not.toHaveBeenCalled();
      }
    });

    it('should throw "InternalServerErrorException" when there is an error while creating a book', async () => {
      bookRepo.findBookByIsbn = jest.fn().mockResolvedValueOnce(false);
      bookRepo.createBook = jest
        .fn()
        .mockRejectedValueOnce(
          new InternalServerErrorException(ErrorMessage.BOOK_CREATE_FAILED),
        );

      try {
        await bookService.createBook(bookSample);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe(ErrorMessage.BOOK_CREATE_FAILED);
        expect(bookRepo.findBookByIsbn).toHaveBeenCalledWith('9783161484100');
        expect(bookRepo.createBook).toHaveBeenCalledWith(bookSample as any);
      }
    });
  });

  describe('indexBook', () => {
    let indexBookFilter: IndexBookFilter;

    beforeEach(() => {
      indexBookFilter = {
        author: 'John Smith',
        title: 'Test Title',
      };
    });

    it('should return the list of books using provided filter and pagination data', async () => {
      const pagination = { perPage: 10, startIndex: 0, page: 1 };
      const booksMockData = [{}, {}, {}];
      const expectedHeaders = {
        'x-next-page': 1,
        'x-page': 1,
        'x-pages-count': 1,
        'x-per-page': 10,
        'x-total-count': 3,
      };

      bookRepo.find = jest.fn().mockResolvedValueOnce(booksMockData as any);
      bookRepo.count = jest.fn().mockResolvedValueOnce(3);
      const response = await bookService.indexBook(indexBookFilter, pagination);
      expect(response).toEqual({
        items: booksMockData,
        headers: expectedHeaders,
      });
      expect(bookRepo.find).toHaveBeenCalledWith(
        indexBookFilter,
        expect.any(Object),
      );
      expect(bookRepo.count).toHaveBeenCalledWith(indexBookFilter);
    });
  });
});
