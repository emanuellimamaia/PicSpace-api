import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  password: string
}