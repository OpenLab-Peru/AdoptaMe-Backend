import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./interfaces/user.interface";
import { UserPaginate } from "./interfaces/user-paginate.interface";
import { RegisterUser } from "./dto/register-user.dto";
import { AuthService } from "../auth/auth.service";
import { LoginUser } from "./dto/login-user.dto";
import { BadRequestException } from "@nestjs/common";

@Resolver('User')
export class UserResolver{
  constructor(
    private readonly service: UserService,
    private readonly authService: AuthService,
  ){}

  @Query()
  async user(@Args('id') id: string): Promise<User>{
    return await this.service.getUser(id);
  }

  @Query()
  async users(
    @Args('page') page: number,
    @Args('limit') limit: number
  ): Promise<UserPaginate> {
    return await this.service.getUsers({ page, limit })
  }

  @Mutation()
  async createUser(
    @Args('input') 
    input: RegisterUser) {
    if(input.password !== input.confirmPassword) throw new BadRequestException('La contraseña y la confirmación de contraseña no concuerdan.');
    const user = await this.service.createUser(input);
    const token = this.authService.getToken({
      id: user._id,
      cellphone: user.cellphone
    })
    return {
      user,
      token,
    };
  }

  @Mutation()
  async loginUser(
    @Args('input')
    input: LoginUser
  ){
    const user = await this.service.login(input);
    const token = this.authService.getToken({
      id: user._id,
      cellphone: user.cellphone
    })
    return {
      user,
      token,
    };
  }
}