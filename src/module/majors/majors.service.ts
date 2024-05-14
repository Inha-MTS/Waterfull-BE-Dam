import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Major } from './entities/major.entity';
import { CreateMajorDto } from './dto/create-major.dto';

@Injectable()
export class MajorsService {
  constructor(@InjectModel(Major.name) private MajorModel: Model<Major>) {}
  async createMajor(createMajorDto: CreateMajorDto) {
    const createdMajor = new this.MajorModel(createMajorDto);
    return createdMajor.save();
  }
}
