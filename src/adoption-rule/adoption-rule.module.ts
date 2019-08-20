import { Module } from '@nestjs/common';
import { AdoptionRuleService } from './adoption-rule.service';

@Module({
  providers: [AdoptionRuleService]
})
export class AdoptionRuleModule {}
