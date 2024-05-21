import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const { images: imageStrings, type } = createUserDto;
    const images = imageStrings.map((imageString: string) =>
      Buffer.from(
        imageString.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      ),
    );
    if (type === 'card') {
      // use ocr to verify the user
    }
    if (type === 'face') {
      // use face recognition to verify the user
    }
    return images;
  }
}
