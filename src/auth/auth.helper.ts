import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigProvider } from '../config/config.provider';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthHelper{
  private config: ConfigService;
  constructor(){
    this.config = ConfigProvider;
    const JWT_SECRET = this.config.get('JWT_SECRET');
    if(!JWT_SECRET) throw new Error('JWT_SECRET don\'t found in config file and is required.');
  }

  jwtSign(payload): Promise<any>{
    const JWT_SECRET = this.config.get('JWT_SECRET');
    const options = {
      expiresIn: '1d'
    }
    return new Promise((res, rej) => {
      jwt.sign(payload, JWT_SECRET, options,(err, token) => {
        if(err) return rej(err);
        return res(token);
      })
    })
  }

  jwtVerify(token){
    const JWT_SECRET = this.config.get('JWT_SECRET');
    return new Promise((res, rej) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) return rej(err);
        return res(decoded);
      })
    })
  }
}