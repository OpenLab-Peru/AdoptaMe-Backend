import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionRuleService } from './adoption-rule.service';

describe('AdoptionRulesService', () => {
  let service: AdoptionRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptionRuleService],
    }).compile();

    service = module.get<AdoptionRuleService>(AdoptionRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
