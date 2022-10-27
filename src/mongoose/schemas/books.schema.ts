import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Books & Document;

@Schema()
export class Books {
  @Prop()
  public id: string;

  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public authors: string;

  @Prop()
  public favorite: string;

  @Prop()
  public fileCover: string;

  @Prop()
  public fileName: string;

  @Prop()
  public fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Books);
//export const BookModel = Model<BookDocument>;
