import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from './books.repository';
import { BookDto } from './dto/book.dto';
import { IndexBookFilter } from './dto/get-book.dto';
import { BookDocument } from './schema/book.schema';
import { IBook } from './book.interface';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useFactory: () => ({
            createBook: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            count: jest.fn(),
            findBookByIsbn: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(BookRepository);
  });

  describe('createBook', () => {
    it('should create book', async () => {
      const bookDto = new BookDto();
      bookDto.title = 'Test Book';
      bookDto.isbn = '1234567890';
      bookDto.author = 'Test Author';
      bookDto.description = '';
      bookDto.cover = '';

      const expectedBook: IBook = {
        title: 'Test Book',
        isbn: '1234567890',
        author: 'Test Author',
        description: '',
        cover: '',
      };

      repository.findBookByIsbn = jest.fn().mockResolvedValueOnce(null);
      repository.createBook = jest.fn().mockResolvedValueOnce(expectedBook);

      const result = await service.createBook(bookDto);

      expect(repository.findBookByIsbn).toHaveBeenCalledWith('1234567890');
      expect(repository.createBook).toHaveBeenCalledWith(bookDto);
      expect(result).toBe(expectedBook);
    });

    it('should throw error if book already exists', async () => {
      const bookDto = new BookDto();
      bookDto.title = 'Test Book';
      bookDto.isbn = '1234567890';
      bookDto.author = 'Test Author';

      repository.findBookByIsbn = jest.fn().mockResolvedValueOnce({});

      await expect(service.createBook(bookDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw error if creating book fails', async () => {
      const bookDto = new BookDto();

      repository.findBookByIsbn = jest.fn().mockResolvedValueOnce(null);
      repository.createBook = jest.fn().mockRejectedValueOnce(new Error());

      await expect(service.createBook(bookDto)).rejects.toThrow(Error);
    });
  });

  describe('indexBook', () => {
    it('should return paginated books', async () => {
      const filters: IndexBookFilter = {};
      const pagination = { page: 1, perPage: 10, startIndex: 0 };

      const expectedBooks: IBook[] = [
        {
          title: 'Test Book',
          isbn: '1234567890',
          author: 'Test Author',
          description: '',
          cover: '',
        },
        {
          title: 'Test Book',
          isbn: '1234567890',
          author: 'Test Author',
          description: '',
          cover: '',
        },
      ];

      repository.find = jest.fn().mockResolvedValueOnce(expectedBooks);
      repository.count = jest.fn().mockResolvedValueOnce(20);

      const result = await service.indexBook(filters, pagination);

      expect(repository.find).toHaveBeenCalledWith(
        filters,
        expect.objectContaining({
          limit: pagination.perPage,
          skip: pagination.startIndex,
        }),
      );
      expect(repository.count).toHaveBeenCalledWith({});
      expect(result).toEqual(
        expect.objectContaining({
          items: expectedBooks,
        }),
      );
    });

    it('should throw error if no books found', async () => {
      const filters: IndexBookFilter = {};
      const pagination = { page: 1, perPage: 10, startIndex: 0 };

      repository.find = jest.fn().mockResolvedValueOnce([]);

      await expect(service.indexBook(filters, pagination)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getBook', () => {
    it('should return book by id', async () => {
      const id = 'test-id';
      const expectedBook: IBook = {
        title: 'Test Book',
        isbn: '1234567890',
        author: 'Test Author',
        description: '',
        cover: '',
      };

      repository.findOne = jest.fn().mockResolvedValueOnce(expectedBook);

      const result = await service.getBook(id);

      expect(repository.findOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toBe(expectedBook);
    });
  });
});
