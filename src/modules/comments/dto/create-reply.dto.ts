import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import * as mongoose from 'mongoose';

export class CreateReplyDto extends CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  parentCommentId: mongoose.Schema.Types.ObjectId;
}
