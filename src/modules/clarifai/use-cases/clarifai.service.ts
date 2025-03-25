import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ImageAnalysisService {
  private readonly apiKey: string;
  private readonly modelId = 'general-image-recognition';
  private readonly modelVersion = 'aa7f35c01e0642fda5cf400f543e7c40';
  private readonly baseUrl = 'https://api.clarifai.com/v2';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow('CLARIFAI_API_KEY');
  }

  async analyzeImage(imageUrl: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/models/${this.modelId}/versions/${this.modelVersion}/outputs`,
        {
          inputs: [
            {
              data: {
                image: {
                  url: imageUrl
                }
              }
            }
          ]
        },
        {
          headers: {
            'Authorization': `Key ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const concepts = response.data.outputs[0].data.concepts;
      const detectedObjects = concepts.map(concept => ({
        name: concept.name,
        confidence: Math.round(concept.value * 10000) / 10000
      }));

      return detectedObjects;
    } catch (error) {
      console.error('Erro ao analisar imagem:', error.response?.data || error.message);
      throw new Error('Erro na análise da imagem');
    }
  }
}
