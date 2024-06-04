import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { RegisterFaceImageDto } from './dto/register-face-image.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

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

  async registerFaceId(registerFaceImageDto: RegisterFaceImageDto) {
    const { id, image } = registerFaceImageDto;
    try {
      const {
        data: { face_id: faceId },
      } = await firstValueFrom(
        this.httpService.post(process.env.FACE_REGISTRATION_LAMBDA_URL, {
          image,
        }),
      );

      console.log(id, faceId); // insert face id here
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('Axios error happened');
      }
      throw new Error('DB error happened');
    }
  }
}
