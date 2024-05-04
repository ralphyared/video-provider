import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './ratings.schema';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from 'src/global/types';
import { AddRatingDto } from './dto/add-rating.dto';
import { IdDto } from 'src/global/common.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
    @Inject(REQUEST) private readonly request: UserRequest,
  ) {}

  async addRating(body: AddRatingDto, param: IdDto) {
    const exist = await this.ratingModel.findOne({
      userId: this.request.user._id,
      videoId: param.id,
    });
    if (exist) {
      return this.ratingModel.findOneAndUpdate(
        { userId: this.request.user._id, videoId: param.id },
        { rating: body.rating },
        { new: true },
      );
    }
    const rating = new this.ratingModel({
      rating: body.rating,
      videoId: param.id,
      userId: this.request.user._id,
    });
    return rating.save();
  }
}
