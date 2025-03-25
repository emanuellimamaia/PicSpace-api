import { Controller, Post, Body } from '@nestjs/common';
import { ImageAnalysisService } from './clarifai.service';

@Controller('clarifai')
export class ClarifaiController {
  constructor(private readonly imageAnalysisService: ImageAnalysisService) { }

  @Post()
  async analyzeImage(@Body('imageUrl') imageUrl: string) {
    try {
      const analysis = await this.imageAnalysisService.analyzeImage(imageUrl);

      return {
        success: true,
        data: analysis
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
} 