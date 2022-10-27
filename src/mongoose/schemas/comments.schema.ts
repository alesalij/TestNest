import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentsDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop()
  public id: string;

  @Prop()
  public bookId: string;

  @Prop()
  public comment: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
//export const BookModel = Model<BookDocument>;
