import { Module } from '@nestjs/common';
import { BottlesService } from './bottles.service';
import { BottlesController } from './bottles.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BottlesController],
  providers: [BottlesService],
})
export class BottlesModule {}
