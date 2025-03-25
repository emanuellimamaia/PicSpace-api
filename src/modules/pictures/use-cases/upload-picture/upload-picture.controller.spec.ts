import { Test, TestingModule } from '@nestjs/testing';
import { UploadPictureController } from './upload-picture.controller';

describe('UploadPictureController', () => {
  let controller: UploadPictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadPictureController],
    }).compile();

    controller = module.get<UploadPictureController>(UploadPictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
