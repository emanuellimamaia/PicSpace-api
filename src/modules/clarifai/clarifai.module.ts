import { Module } from '@nestjs/common';
import { ClarifaiController } from './use-cases/clarifai.controller';
import { ClarifaiService } from './use-cases/clarifai.service';

@Module({
  controllers: [ClarifaiController],
  providers: [ClarifaiService],
  exports: [ClarifaiService]
})
export class ClarifaiModule { } 