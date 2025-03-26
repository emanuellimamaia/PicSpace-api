import { Inject, Injectable } from '@nestjs/common';
import { PictureRepo } from '../../repositories/picture.repo';
import { IPictureRepo } from '../../repositories/picture.repo.interface';
import { Picture } from '../../domain/picture.entity';

@Injectable()
export class SavePictureService {
  constructor(
    @Inject('IPictureRepo')
    private readonly pictureRepo: IPictureRepo) { }

  async execute(picture: Picture): Promise<Picture> {
    return this.pictureRepo.savePicture(picture)
  }
}
