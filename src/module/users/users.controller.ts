import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterFaceImageDto } from './dto/register-face-image.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @route POST /users
   * @desc Create User
   * @access Public
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * @route POST /users/login
   * @desc Login User
   * @access Public
   */
  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const { type, id, image } = loginUserDto;
    if ((type === 'face' && !image) || (type === 'card' && !id)) {
      throw new HttpException(
        {
          message: 'Missing required fields',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.loginUser(loginUserDto);
  }

  /**
   * @route POST /users/face-image
   * @desc Register Face Id
   * @access Public
   */
  @Post('/face-image')
  async registerFaceId(@Body() registerFaceImageDto: RegisterFaceImageDto) {
    return this.usersService.registerFaceId(registerFaceImageDto);
  }

  /**
   * @route GET /users/:id
   * @desc Get User Info
   * @access Public
   */
  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }
}
