import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BookSchema } from '../../mongoose/schemas/books.schema';
import { BooksRepository } from './books.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
