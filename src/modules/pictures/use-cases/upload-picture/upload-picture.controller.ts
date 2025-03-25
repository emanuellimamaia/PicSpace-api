import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPictureService } from './upload-picture.service';

@Controller('upload-picture')
export class UploadPictureController {
  constructor(private readonly uploadPictureService: UploadPictureService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'image/*' })
    ]
  })) file: Express.Multer.File) {
    await this.uploadPictureService.upload(file.originalname, file.buffer, file.mimetype)
  }
}
