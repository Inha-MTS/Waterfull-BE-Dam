import { Body, Controller, Post } from '@nestjs/common';
import { BottlesService } from './bottles.service';

@Controller('bottles')
export class BottlesController {
  constructor(private readonly bottlesService: BottlesService) {}

  /**
   * @route Post /bottles/category
   * @desc Get Bottle Category
   * @access Public
   */
  @Post('/category')
  async getBottleCategory(@Body('image') image: string) {
    return this.bottlesService.getBottleCategory(image);
  }
}
