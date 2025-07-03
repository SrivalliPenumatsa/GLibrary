import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genre } from 'src/common/enums/genre.enum';

@Schema()//{ timestamps: true })
export class Book extends Document {
  @Prop({ required: true, unique: true, index: true })
  bookId: string;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  author: string;

  @Prop({ required: true, enum: Genre, index: true })
  genre: Genre;

  @Prop({ required: true })
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);