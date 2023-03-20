import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IBook } from './book.interface';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BookRepository implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Book.name)
    private readonly bookRepository: Model<BookDocument>,
  ) {}
  async onApplicationBootstrap(): Promise<void> {
    const result = await this.bookRepository.db.db
      .listCollections({ name: this.bookRepository.collection.collectionName })
      .next();

    if (!result) {
      await this.bookRepository.createCollection();
    }
  }

  createBook(data: IBook) {
    return this.bookRepository.create(data);
  }

  findBookByIsbn(isbn: string) {
    return this.bookRepository.findOne({ isbn });
  }

  find(filter: FilterQuery<BookDocument>, options?: QueryOptions) {
    return this.bookRepository.find(filter, {}, options);
  }

  findOne(filter: FilterQuery<BookDocument>, options?: QueryOptions) {
    return this.bookRepository.findOne(filter, options);
  }

  count(filter: FilterQuery<BookDocument>) {
    return this.bookRepository.count(filter);
  }

  updateOne(filter: FilterQuery<IBook>, data) {
    return this.bookRepository.updateOne(filter, { $set: data }).exec();
  }

  deleteOne(filter: FilterQuery<IBook>) {
    return this.bookRepository.deleteOne(filter).exec();
  }
}
