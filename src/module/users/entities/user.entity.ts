import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Major } from 'src/module/majors/entities/major.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  facialVector: number[];

  @Prop()
  point: number;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Major' }] })
  major: Major;
}

export const UserSchema = SchemaFactory.createForClass(User);
