import { Module } from '@nestjs/common';
import { UploadPictureController } from './pictures/use-cases/upload-picture/upload-picture.controller';
import { UploadPictureService } from './pictures/use-cases/upload-picture/upload-picture.service';
import { GetPicturesController } from './pictures/use-cases/get-pictures/get-pictures.controller';
import { GetPicturesService } from './pictures/use-cases/get-pictures/get-pictures.service';



@Module({
  imports: [],
  controllers: [UploadPictureController, GetPicturesController],
  providers: [UploadPictureService, GetPicturesService],
})
export class PicturesModule { }
