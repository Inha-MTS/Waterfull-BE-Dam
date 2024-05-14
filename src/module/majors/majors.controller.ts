import { Controller, Post, Body } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  /**
   * @route POST /majors
   * @desc Create Major
   * @access Public
   */

  @Post()
  async createMajor(@Body() createMajorDto: CreateMajorDto): Promise<void> {
    await this.majorsService.createMajor(createMajorDto);
  }
}
