import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetPicturesService } from './get-pictures.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';

@ApiTags('Pictures')
@Controller('pictures')
@ApiBearerAuth()
export class GetPicturesController {
  constructor(private readonly getPicturesService: GetPicturesService) { }



  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPictures() {
    return this.getPicturesService.getAllPictures();
  }
} 