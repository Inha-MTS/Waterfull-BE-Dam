import { Module } from '@nestjs/common';
import { BottlesService } from './bottles.service';
import { BottlesController } from './bottles.controller';
import { HttpModule } from '@nestjs/axios';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [HttpModule, AwsModule],
  controllers: [BottlesController],
  providers: [BottlesService],
})
export class BottlesModule {}
