import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const { id } = await newUser.save();
    return {
      message: 'CREATED USER',
      data: { id },
    };
  }
}
