import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './entity/userEntity';
import { CreateuserDto } from './interface/createUser.interface';
import { UserService } from './user.service';

interface UserId {
  id: number;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('AppController', 'Accumulate')
  accumulate(userId: UserId, metadata: any): any {
    return this.userService.accumulae(userId.id);
  }

  @GrpcMethod('AppController', 'AddUser')
  async addUser(userDto: CreateuserDto, metadata: any) {
    const newUser = await this.userService.addUser(userDto);
    return {
      messgae: 'User Created',
    };
  }

  @GrpcMethod('AppController', 'GetAllUsers')
  async getAllUsers(): Promise<any> {
    const allusers = await this.userService.getAllUsers();
    return { allusers };
  }
}
