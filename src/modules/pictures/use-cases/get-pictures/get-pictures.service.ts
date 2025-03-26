
import { Inject, Injectable } from "@nestjs/common";
import { IPictureRepo } from "../../repositories/picture.repo.interface";
import { Picture } from "../../domain/picture.entity";

@Injectable()
export class GetPicturesService {
  constructor(
    @Inject('IPictureRepo')
    private readonly pictureRepo: IPictureRepo) { }

  async getPictures(userId: string): Promise<Picture[]> {
    return this.pictureRepo.getPictures(userId);
  }
}