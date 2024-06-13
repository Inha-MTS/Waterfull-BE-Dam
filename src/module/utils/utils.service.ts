import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() {}

  getImagePathName(category: string, id?: number) {
    const path = category === 'face' ? category : `bottle/${category}`;
    const date = new Date();
    return `image/${path}/${id ?? 'general'}-${date.getTime()}`;
  }

  convertImageToBuffer(image: string) {
    return Buffer.from(image, 'base64');
  }
}
