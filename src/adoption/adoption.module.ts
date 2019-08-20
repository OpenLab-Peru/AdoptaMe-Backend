import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';

@Module({
  providers: [AdoptionService]
})
export class AdoptionModule {}
