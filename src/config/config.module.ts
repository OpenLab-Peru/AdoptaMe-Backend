import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigProvider } from './config.provider';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: ConfigProvider,
    },
  ],
  exports: [
    ConfigService
  ],
})
export class ConfigModule {}
