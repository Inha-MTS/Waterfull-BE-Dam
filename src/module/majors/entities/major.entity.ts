import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MajorDocument = HydratedDocument<Major>;

@Schema()
export class Major {
  @Prop()
  name: string;

  @Prop()
  department: string;
}

export const MajorSchema = SchemaFactory.createForClass(Major);
