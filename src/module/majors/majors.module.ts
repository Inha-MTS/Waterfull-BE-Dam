import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MajorsService } from './majors.service';
import { MajorsController } from './majors.controller';
import { Major, MajorSchema } from './entities/major.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Major.name, schema: MajorSchema }]),
  ],
  controllers: [MajorsController],
  providers: [MajorsService],
})
export class MajorsModule {}
