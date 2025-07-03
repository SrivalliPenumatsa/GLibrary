import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Discussion extends Document {

  @Prop({ required: true, unique: true })
  discussionId: string;

  @Prop({ required: true})
  bookId: string;

  @Prop({ required: true})
  userId: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  createdAt: Date;
  
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);