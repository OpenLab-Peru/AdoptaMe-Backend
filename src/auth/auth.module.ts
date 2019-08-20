import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';

@Module({ 
  providers: [
    AuthHelper,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}