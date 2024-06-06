import { Test, TestingModule } from '@nestjs/testing';
import { BottlesController } from './bottles.controller';
import { BottlesService } from './bottles.service';

describe('BottlesController', () => {
  let controller: BottlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BottlesController],
      providers: [BottlesService],
    }).compile();

    controller = module.get<BottlesController>(BottlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
