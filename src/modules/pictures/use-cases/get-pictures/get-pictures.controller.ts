import { Controller, Get } from '@nestjs/common';
import { GetPicturesService } from './get-pictures.service';

@Controller('pictures')
export class GetPicturesController {
  constructor(private readonly getPicturesService: GetPicturesService) { }

  @Get()
  async getAllPictures() {
    return this.getPicturesService.getAllPictures();
  }
} 