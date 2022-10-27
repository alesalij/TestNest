import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Comments,
  CommentsSchema,
} from '../../mongoose/schemas/comments.schema';
import { CommentsService } from './books-comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
  ],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
