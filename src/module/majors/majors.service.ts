import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Major } from './entities/major.entity';
import { CreateMajorDto } from './dto/create-major.dto';
import { responseMessage } from 'src/constants/response-message';

@Injectable()
export class MajorsService {
  constructor(@InjectModel(Major.name) private MajorModel: Model<Major>) {}

  async createMajor(createMajorDto: CreateMajorDto) {
    const createdMajor = new this.MajorModel(createMajorDto);
    return createdMajor.save();
  }

  async createMajorBatch(createMajorDtos: CreateMajorDto[]) {
    const createdMajors = createMajorDtos.map(
      (createMajorDto: CreateMajorDto) => {
        return new this.MajorModel(createMajorDto);
      },
    );
    return this.MajorModel.insertMany(createdMajors);
  }

  async getMajors() {
    const majors = await this.MajorModel.find();
    const groupedMajors = majors.reduce((acc, major) => {
      const { _id: id, name, department } = major;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push({ id: id.toString(), name });
      return acc;
    }, {});
    return {
      message: responseMessage.GET_MAJOR_LIST_SUCCESS,
      data: groupedMajors,
    };
  }
}
