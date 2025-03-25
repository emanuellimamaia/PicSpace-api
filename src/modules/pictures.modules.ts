import { Module } from '@nestjs/common';
import { UploadPictureController } from './pictures/use-cases/upload-picture/upload-picture.controller';
import { UploadPictureService } from './pictures/use-cases/upload-picture/upload-picture.service';



@Module({
  imports: [],
  controllers: [UploadPictureController],
  providers: [UploadPictureService],
})
export class PicturesModule { }
