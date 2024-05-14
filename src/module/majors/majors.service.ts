import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Major } from './entities/major.entity';

@Injectable()
export class MajorsService {
  constructor(@InjectModel(Major.name) private MajorModel: Model<Major>) {}
}
