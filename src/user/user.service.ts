import { Injectable, Inject, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserPaginate } from './interfaces/user-paginate.interface';
import { RegisterUser } from './interfaces/register-user.interface';
import { LoginUser } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>
  ){}

  async getUsers({ page = 1, limit = 10  }): Promise<UserPaginate>{
    const skip = page * limit;
    const count = await this.userModel.countDocuments();
    const users = await this.userModel.find().skip(skip).limit(limit);
    const pages = count === 0 ? 0 : Math.floor(count / limit);
    return <UserPaginate>{
      limit,
      page,
      count,
      pages,
      users,
    }
  }

  async getUser(id: string): Promise<User>{
    if(!Types.ObjectId.isValid(id)) throw new NotFoundException('No se ha encontrado al usuario buscado.')
    return await this.userModel.findById(id);
  }

  async createUser(
    userData: RegisterUser
    ): Promise<Model<User>>{
    userData.cellphone = '+51' + userData.cellphone;
    let existingUser = await this.userModel.findOne({ email: userData.email, isDeleted: 0 });
    if(existingUser) throw new BadRequestException('Ya existe un usuario registrado con el mismo correo');
    existingUser = await this.userModel.findOne({ cellphone: userData.cellphone, isDeleted: 0 });
    if(existingUser) throw new BadRequestException('Ya existe un usuario registrado con el mismo celular');
    const newUser = new this.userModel(userData)
    await newUser.save();
    return newUser;
  }

  async login(
    loginData: LoginUser
  ){
    const existingUser = await this.userModel.findOne({ email: loginData.email, isDeleted: 0 })
    if(!existingUser) throw new UnauthorizedException('No se ha encontrado ningun usuario registrado con ese correo.');
    const isMatch = await existingUser.comparePassword(loginData.password);
    if(!isMatch) throw new UnauthorizedException('Correo o contraseña equivocada.');
    return existingUser;
  }
}
