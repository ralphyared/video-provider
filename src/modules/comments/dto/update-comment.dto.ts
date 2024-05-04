import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
