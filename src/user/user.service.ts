import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/userEntity';
import { CreateuserDto } from './interface/createUser.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async accumulae(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async addUser(createUserDto: CreateuserDto) {
    console.log(createUserDto);
    console.log('scjnwdckjwc');
    const user = await this.userRepository.create(createUserDto);
    console.log('from user service', user);
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
