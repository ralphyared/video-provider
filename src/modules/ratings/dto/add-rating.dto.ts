import { IsInt, IsMongoId, IsNotEmpty, Max, Min } from 'class-validator';
import * as mongoose from 'mongoose';

export class AddRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
