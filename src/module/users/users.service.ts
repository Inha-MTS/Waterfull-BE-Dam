import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpService } from '@nestjs/axios';
import { RegisterFaceImageDto } from './dto/register-face-image.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoginUserDto } from './dto/login-user.dto';
import { responseMessage } from 'src/constants/response-message';

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
      message: responseMessage.CREATE_USER_SUCCESS,
      data: { id },
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { type, id, image } = loginUserDto;
    if (type === 'face') {
      return this.#loginUserWithFaceId(image);
    }
    return this.#loginUserWithStudentId(id);
  }

  async #loginUserWithFaceId(image: string) {
    console.log(image);
  }

  async #loginUserWithStudentId(id: number) {
    console.log(id);
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

      const updatedUser = await this.#registerFaceIdInMongo(id, faceId);
      return {
        message: responseMessage.REGISTER_FACE_ID_SUCCESS,
        data: { id: updatedUser.id },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          {
            message: responseMessage.AXIOS_ERROR,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          message: responseMessage.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async #registerFaceIdInMongo(id: number, faceId: string) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      { faceId },
      { new: true },
    );
    return updatedUser;
  }
}
