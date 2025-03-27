import { Module } from '@nestjs/common';
import { UploadPictureController } from './use-cases/upload-picture/upload-picture.controller';
import { UploadPictureService } from './use-cases/upload-picture/upload-picture.service';
import { GetPicturesController } from './use-cases/get-pictures/get-pictures.controller';
import { ClarifaiService } from '../clarifai/use-cases/clarifai.service';
import { DatabaseModule } from 'src/infra/database.module';
import { PictureRepo } from './repositories/picture.repo';
import { SavePictureService } from './use-cases/save-picture/save-picture.service';
import { GetPicturesService } from './use-cases/get-pictures/get-pictures.service';
import { DeletePictureController } from './use-cases/delete-picture/delete-picture.controller';
import { DeletePictureService } from './use-cases/delete-picture/delete-picture.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadPictureController, GetPicturesController, DeletePictureController],
  providers: [
    UploadPictureService,
    GetPicturesService,
    ClarifaiService,
    PictureRepo,
    SavePictureService,
    DeletePictureService,
    {
      provide: 'IPictureRepo',
      useClass: PictureRepo
    }
  ],
})
export class PicturesModule { }
