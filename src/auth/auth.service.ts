import { Injectable, Inject } from "@nestjs/common";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthService{
  private helper: AuthHelper;
  constructor(){
    this.helper = new AuthHelper();
  }

  async getToken(payload){
    return await this.helper.jwtSign(payload);
  }

  async verifyToken(token){
    return await this.helper.jwtVerify(token);
  }
}