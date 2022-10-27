/* eslint-disable @typescript-eslint/ban-types */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
} from '@nestjs/common';
import { BookDocument } from '../../mongoose/schemas/books.schema';

import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { book as UpdateBookDto } from './types';
import { paramId as IParamId } from './types';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { ValidationPipe } from './pipes/validation.pipe';
// @UseInterceptors(LoggingInterceptor)
@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Promise<BookDocument[]> {
    console.log('Controller', this.booksService.getBooks());
    return this.booksService.getBooks();
  }
  @Get(':id')
  getBook(@Param() { id }: IParamId): Promise<BookDocument> {
    console.log('controller', id);
    return this.booksService.getBook(id);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  addBook(@Body() data: CreateBookDTO) {
    console.log('jsonData', data);
    //const data: object = JSON.parse(jsonData);

    this.booksService.addBook(data);
  }

  @Put(':id')
  public update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ):
    | QueryWithHelpers<
        HydratedDocument<BookDocument, {}, {}> | null,
        HydratedDocument<BookDocument, {}, {}>,
        {},
        BookDocument
      >
    | Promise<BookDocument> {
    console.log(body);
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  public delete(
    @Param() { id }: IParamId,
  ):
    | QueryWithHelpers<
        HydratedDocument<BookDocument, {}, {}> | null,
        HydratedDocument<BookDocument, {}, {}>,
        {},
        BookDocument
      >
    | Promise<BookDocument> {
    return this.booksService.delete(id);
  }
}
