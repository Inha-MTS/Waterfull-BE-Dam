import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors({
    origin: [
      process.env.FE_AMPLIFY_URL,
      process.env.FE_HEROKU_URL,
      process.env.FE_S3_URL,
      'http://localhost:3000',
    ],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
