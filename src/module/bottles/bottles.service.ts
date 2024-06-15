import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { responseMessage } from 'src/constants/response-message';
import { UtilsService } from '../utils/utils.service';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class BottlesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
    private readonly awsService: AwsService,
  ) {}

  async getBottleCategory(image: string) {
    try {
      const {
        data: { category, probability },
      } = await firstValueFrom(
        this.httpService.post(process.env.BOTTLE_CLASSIFIER_LAMBDA_URL, {
          image,
        }),
      );
      const isImageTrustworthy = probability >= 0.5;
      const bottleCategory = {
        0: 'plastic',
        1: 'paper',
        2: 'tumbler',
      }[category];
      // const fileName = this.utilsService.getImagePathName(bottleCategory);
      // const imageBuffer = this.utilsService.convertImageToBuffer(image);
      // this.awsService.uploadImageToS3(fileName, imageBuffer);
      return {
        status: isImageTrustworthy ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        message: isImageTrustworthy
          ? responseMessage.GET_BOTTLE_CATEGORY_SUCCESS
          : responseMessage.NEED_NEW_BOTTLE_IMAGE,
        data: {
          category: bottleCategory,
          probability,
        },
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
}
