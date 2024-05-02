import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { AgeRestriction } from 'src/global/enums';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsEnum(AgeRestriction)
  ageRestriction: string;
}
