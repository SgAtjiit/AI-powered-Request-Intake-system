import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message!: string;
}
