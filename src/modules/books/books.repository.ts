import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../../mongoose/entity.repository';
import { Books, BookDocument } from '../../mongoose/schemas/books.schema';

@Injectable()
export class BooksRepository extends EntityRepository<BookDocument> {
  constructor(
    @InjectModel(Books.name) booksModel: Model<BookDocument>,
    //@InjectConnection() private connection: Connection,
  ) {
    super(booksModel);
  }
}
