import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './videos.schema';
import mongoose, { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { GetVideosDto } from './dto/get-videos.dto';
import { IdDto } from 'src/global/common.dto';
import moment from 'moment';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from 'src/global/types';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @Inject(REQUEST) private readonly request: UserRequest,
  ) {}

  async createVideo(body: CreateVideoDto) {
    const video = new this.videoModel({ ...body });
    return video.save();
  }

  async getVideos(query: GetVideosDto) {
    const agg = [];

    if (query.title) {
      agg.push({ $match: { title: { $regex: `${query.title}` } } });
    } else {
      agg.push({ $match: {} });
    }

    if (query.sortByRating) {
      agg.push({ $sort: { rating: -1 } });
    }

    agg.push({ $project: { _id: 0, __v: 0, updatedAt: 0 } });
    return this.videoModel.aggregate(agg);
  }

  async playVideo(param: IdDto) {
    const age = moment().diff(this.request.user.dateOfBirth, 'years');
    const video = await this.videoModel.findById(param.id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    if (age < video.ageRestriction) {
      const err = new ForbiddenException(
        'You are not old enough to watch this video',
      );
      throw err;
    }
    return video.url;
  }

  async findVideoById(id: mongoose.Schema.Types.ObjectId) {
    return this.videoModel.findById(id);
  }
}
