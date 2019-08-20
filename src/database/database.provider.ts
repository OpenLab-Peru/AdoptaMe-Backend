import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { ConfigProvider } from '../config/config.provider';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () : Promise<typeof mongoose> =>  {
      const MONGODB_URI = ConfigProvider.get('MONGODB_URI')
      const connection = await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        poolSize: 10,
      })
      new Logger('DatabaseConnection', true).log('Database connection stablished');
      return connection;
    } 
  },
];
