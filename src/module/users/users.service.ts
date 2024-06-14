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
import { UtilsService } from '../utils/utils.service';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
    private readonly awsService: AwsService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const { id } = await newUser.save();
    return {
      message: responseMessage.CREATE_USER_SUCCESS,
      data: { id },
    };
  }

  loginUser(loginUserDto: LoginUserDto) {
    const { type, id, image } = loginUserDto;
    if (type === 'face') {
      return this.#loginUserWithFaceId(image);
    }
    return this.#loginUserWithStudentId(id);
  }

  async #loginUserWithFaceId(image: string) {
    try {
      const {
        data: { face_id: faceId },
      } = await firstValueFrom(
        this.httpService.post(process.env.FACE_RECOGNITION_LAMBDA_URL, {
          image,
        }),
      );
      const user = await this.userModel.findOne({ faceId });
      if (!user) {
        throw new HttpException(
          {
            message: responseMessage.USER_NOT_FOUND,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const fileName = this.utilsService.getImagePathName('face', user.id);
      const imageBuffer = this.utilsService.convertImageToBuffer(image);
      this.awsService.uploadImageToS3(fileName, imageBuffer);
      return {
        status: HttpStatus.OK,
        message: responseMessage.LOGIN_USER_SUCCESS,
        data: { id: user.id, name: user.name },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosStatus = error.response.status;
        throw new HttpException(
          {
            message: responseMessage.AXIOS_ERRORS[axiosStatus],
          },
          axiosStatus || HttpStatus.INTERNAL_SERVER_ERROR,
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

  async #loginUserWithStudentId(id: number) {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new HttpException(
        {
          message: responseMessage.USER_NOT_FOUND,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      status: HttpStatus.OK,
      message: responseMessage.LOGIN_USER_SUCCESS,
      data: { id: user.id, name: user.name },
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

      const updatedUser = await this.#registerFaceIdInMongo(id, faceId);
      if (!updatedUser) {
        throw new HttpException(
          {
            message: responseMessage.USER_NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: responseMessage.REGISTER_FACE_ID_SUCCESS,
        data: { id: updatedUser.id },
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          {
            message: responseMessage.AXIOS_ERRORS[500],
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

  async getUser(id: number) {
    const user = await this.userModel.findOne({ id }).populate('major');
    if (!user) {
      throw new HttpException(
        {
          message: responseMessage.USER_NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: responseMessage.GET_USER_SUCCESS,
      data: {
        id: user.id,
        name: user.name,
        major: user.major.name,
        point: user.point,
        faceId: user.faceId,
      },
    };
  }

  async addUserPoint(id: number) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      { $inc: { point: 100 } },
      { new: true },
    );
    return {
      message: responseMessage.ADD_USER_POINT_SUCCESS,
      data: { id: updatedUser.id, point: updatedUser.point },
    };
  }
}
