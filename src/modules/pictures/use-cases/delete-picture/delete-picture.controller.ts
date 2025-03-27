import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePictureService } from './delete-picture.service';

@Controller('delete-picture')
export class DeletePictureController {

  constructor(
    private readonly deletePictureService: DeletePictureService
  ) { }

  @Delete(':id')
  async deletePicture(@Param('id') id: string) {
    return this.deletePictureService.execute(id)
  }
}
