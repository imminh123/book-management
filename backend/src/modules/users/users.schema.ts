import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserProfile } from './users.interface';

@Schema()
class User implements UserProfile {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String, required: true })
  discriminator: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = UserProfile & Document;
