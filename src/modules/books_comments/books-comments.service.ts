import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Comments,
  CommentsDocument,
} from 'src/mongoose/schemas/comments.schema';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private BooksModel: Model<CommentsDocument>,
  ) {}

  findAll(bookId: string): Promise<CommentsDocument[]> {
    return this.BooksModel.find({ bookId }).exec();
  }

  create(data: CreateDto): Promise<CommentsDocument> {
    return this.BooksModel.create(data);
  }
}
