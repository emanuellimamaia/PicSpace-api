import { Controller, Body } from '@nestjs/common';
import { ClarifaiService } from './clarifai.service';

@Controller('clarifai')
export class ClarifaiController {
  constructor(private readonly imageAnalysisService: ClarifaiService) { }

  //Post() - Rota desativada somente para teste de envio de imagens para  clarifai
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