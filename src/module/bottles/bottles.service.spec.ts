import { Test, TestingModule } from '@nestjs/testing';
import { BottlesService } from './bottles.service';

describe('BottlesService', () => {
  let service: BottlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BottlesService],
    }).compile();

    service = module.get<BottlesService>(BottlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
