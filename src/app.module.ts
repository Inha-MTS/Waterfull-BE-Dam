import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/users/users.module';
import { MajorsModule } from './module/majors/majors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    MajorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
