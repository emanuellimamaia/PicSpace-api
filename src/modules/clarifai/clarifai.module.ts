import { Module } from '@nestjs/common';
import { ClarifaiController } from './use-cases/clarifai.controller';
import { ImageAnalysisService } from './use-cases/clarifai.service';

@Module({
  controllers: [ClarifaiController],
  providers: [ImageAnalysisService],
  exports: [ImageAnalysisService]
})
export class ClarifaiModule { } 