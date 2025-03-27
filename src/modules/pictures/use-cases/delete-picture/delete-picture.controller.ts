import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { DeletePictureService } from './delete-picture.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt.guard';

@ApiTags('Pictures')
@ApiBearerAuth()
@Controller('delete-picture')
export class DeletePictureController {

  constructor(
    private readonly deletePictureService: DeletePictureService
  ) { }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePicture(@Param('id') id: string) {
    return this.deletePictureService.execute(id)
  }
}
