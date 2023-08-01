import { Module } from '@nestjs/common';
import { UploadService } from './service';
import { UploadController } from './controller';
import { CloudinaryProvider } from '../../../configs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './src/upload',
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
