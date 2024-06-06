import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { responseMessage } from 'src/constants/response-message';

@Injectable()
export class BottlesService {
  constructor(private readonly httpService: HttpService) {}

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
      return {
        status: isImageTrustworthy ? HttpStatus.OK : HttpStatus.NO_CONTENT,
        message: isImageTrustworthy
          ? responseMessage.GET_BOTTLE_CATEGORY_SUCCESS
          : responseMessage.NEED_NEW_BOTTLE_IMAGE,
        data: {
          category: category === 1 ? 'tumbler' : 'paper-cup',
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
