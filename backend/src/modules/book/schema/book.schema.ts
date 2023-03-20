import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBook } from '../book.interface';

export type BookDocument = Book & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Book implements IBook {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isbn: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
