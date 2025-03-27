import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { UploadPictureService } from './upload-picture.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Pictures')
@Controller('upload-picture')
@ApiBearerAuth()
export class UploadPictureController {

  constructor(private readonly uploadPictureService: UploadPictureService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/picture')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request
  ) {
    const user = req.user as { id: string };
    return this.uploadPictureService.upload(file.originalname, file.buffer, file.mimetype, user.id);
  }
}
