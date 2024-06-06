import { Controller, Post, Body, Get } from '@nestjs/common';
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

  /**
   * @route POST /majors/batch
   * @desc Create Majors in Batch
   * @access Public
   */
  @Post('/batch')
  async createMajorBatch(
    @Body() createMajorDtos: CreateMajorDto[],
  ): Promise<void> {
    await this.majorsService.createMajorBatch(createMajorDtos);
  }

  /**
   * @route GET /majors
   * @desc Get Major List
   * @access Public
   */
  @Get()
  async getUMajors() {
    return this.majorsService.getMajors();
  }
}
