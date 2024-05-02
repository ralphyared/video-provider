import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AgeRestriction } from 'src/global/enums';

export type VideoDocument = mongoose.HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  duration: number;

  @Prop({ enum: AgeRestriction, default: AgeRestriction.EVERYONE })
  ageRestriction: string;

  @Prop({ default: 0 })
  averageRating: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({ title: 1, averageRating: -1 });
