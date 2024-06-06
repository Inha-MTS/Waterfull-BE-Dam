import { Controller } from '@nestjs/common';
import { BottlesService } from './bottles.service';

@Controller('bottles')
export class BottlesController {
  constructor(private readonly bottlesService: BottlesService) {}
}
