import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
export type AnnouncementDocument = HydratedDocument<Announcement>;
@Schema()
export class Announcement extends Document {
  @Prop({ required: true, unique: true })
  announcementId: string;

  // @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  // userId: Types.ObjectId;

  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  createdAt: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);