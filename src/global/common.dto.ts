import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

export class IdDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Schema.Types.ObjectId;
}
