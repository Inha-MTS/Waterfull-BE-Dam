import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Major } from 'src/module/majors/entities/major.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ autoCreate: true })
export class User {
  @Prop({ unique: true, required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  faceId: string;

  @Prop({ default: 0 })
  point: number;

  @Prop()
  lastPointTimestp: Date;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Major' })
  major: Major;
}

export const UserSchema = SchemaFactory.createForClass(User);
