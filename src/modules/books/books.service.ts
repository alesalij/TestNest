/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { Model, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Books, BookDocument } from '../../mongoose/schemas/books.schema';
import { book as CreateBookDto } from './types';
import { book as UpdateBookDto } from './types';
import { BooksRepository } from './books.repository';
@Injectable()
export class BooksService {
  books: object[] = [];

  // constructor(
  //   @InjectModel(Books.name) private BookModel: Model<BookDocument>,
  // ) {}
  constructor(private readonly booksRepository: BooksRepository) {}

  getBooks(): Promise<BookDocument[]> {
    // return this.books;
    return this.booksRepository.find({});
  }
  getBook(id: string): Promise<BookDocument> {
    // return this.books;
    console.log('id', id);
    return this.booksRepository.findOne({ _id: id });
  }

  addBook(data: CreateBookDto): Promise<BookDocument> {
    // this.books.push(book);
    // console.log(this.books);
    return this.booksRepository.create(data);
  }

  public create(data: CreateBookDto): Promise<BookDocument> {
    return this.booksRepository.create(data);
  }

  public update(id: string, data: UpdateBookDto): Promise<BookDocument> {
    // return this.BookModel.findOneAndUpdate({ _id: id }, data);
    return this.booksRepository.findOneAndUpdate({ _id: id }, data);
  }

  public delete(id: string): Promise<BookDocument> {
    return this.booksRepository.delete({ _id: id });
  }
}
