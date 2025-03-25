import { Test, TestingModule } from '@nestjs/testing';
import { UploadPictureService } from './upload-picture.service';

describe('UploadPictureService', () => {
  let service: UploadPictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadPictureService],
    }).compile();

    service = module.get<UploadPictureService>(UploadPictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
