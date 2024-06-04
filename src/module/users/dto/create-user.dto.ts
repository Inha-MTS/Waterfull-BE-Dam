import { Schema } from 'mongoose';

export interface CreateUserDto {
  id: number;
  name: string;
  major: Schema.Types.ObjectId;
}
