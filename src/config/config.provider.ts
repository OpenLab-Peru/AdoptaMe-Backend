import { ConfigService } from '../config/config.service';
import * as path from 'path';

const ENVIRONMENT: string = process.env.NODE_ENV;
let configPath;
switch(ENVIRONMENT){
  case 'TEST':
  case 'TESTING': configPath = path.resolve(__dirname, '..', '..', 'test.env'); break;
  case 'PROD':
  case 'PRODUCTION': configPath = path.resolve(__dirname, '..', '..', 'prod.env'); break;
  default: configPath = path.resolve(__dirname, '..', '..', 'dev.env'); break;
}

export const ConfigProvider = new ConfigService(configPath)