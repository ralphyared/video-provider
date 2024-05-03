import { IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

export class IdDto {
  @IsMongoId()
  id: Schema.Types.ObjectId;
}
