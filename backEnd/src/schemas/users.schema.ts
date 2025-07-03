import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  // @Prop({ required: true, unique: true, default: uuidv4 })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: false })
  name: string;

@Prop({ required: false})
    password?: string;

  @Prop({required: true})
  lastInteraction : Date
}

export const UserSchema = SchemaFactory.createForClass(User);