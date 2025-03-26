import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';
import { GetPicturesService } from './get-pictures.service';
import { Request } from 'express';
import { PictureMappers } from '../../mappers/picture.mappers';

@ApiTags('Pictures')
@Controller('pictures')
@ApiBearerAuth()
export class GetPicturesController {
  constructor(private readonly getPicturesService: GetPicturesService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPictures(@Req() req: Request) {
    const user = req.user as { id: string };
    const pictures = await this.getPicturesService.getPictures(user.id);
    return pictures.map(picture => PictureMappers.toDto(picture));
  }
} 