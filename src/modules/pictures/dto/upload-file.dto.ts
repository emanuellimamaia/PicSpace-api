import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  file: Express.Multer.File;

  @ApiProperty({
    description: 'Optional description for the file',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
} 