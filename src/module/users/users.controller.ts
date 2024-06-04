import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterFaceImageDto } from './dto/register-face-image.dto';

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
   * @route POST /users/face-image
   * @desc Register Face Id
   * @access Public
   */
  @Post('/face-image')
  async registerFaceId(@Body() registerFaceImageDto: RegisterFaceImageDto) {
    return this.usersService.registerFaceId(registerFaceImageDto);
  }
}
