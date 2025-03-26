import { Picture } from "../domain/picture.entity";

export interface IPictureRepo {
  savePicture(picture: Picture): Promise<Picture>;
  getPictures(userId: string, tag?: string): Promise<Picture[]>;
}