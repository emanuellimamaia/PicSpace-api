import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiQuery({ name: 'tag', required: false, description: 'Nome da tag para filtrar as imagens' })
  async getAllPictures(@Req() req: Request, @Query('tag') tag?: string) {
    const user = req.user as { id: string };
    const pictures = await this.getPicturesService.getPictures(user.id, tag);
    return pictures.map(picture => PictureMappers.toDto(picture));
  }
} 