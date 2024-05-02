import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  videoId: mongoose.Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  text: string;
}
