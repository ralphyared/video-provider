import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';
import { IdDto } from 'src/global/common.dto';
import { Comment } from './comments.schema';
import { VideosService } from '../videos/videos.service';
import { REQUEST } from '@nestjs/core';
import { UserRequest } from 'src/global/types';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(REQUEST) private readonly request: UserRequest,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private videosService: VideosService,
  ) {}

  async createComment(body: CreateCommentDto, param: IdDto) {
    const video = await this.videosService.findVideoById(param.id);
    if (!video) {
      throw new NotFoundException('Video does not exist');
    }

    const comment = new this.commentModel({
      ...body,
      videoId: param.id,
      userId: this.request.user._id,
    });
    return comment.save();
  }

  async updateComment(body: UpdateCommentDto, param: IdDto) {
    const comment = await this.commentModel.findOneAndUpdate(
      {
        _id: param.id,
        userId: this.request.user._id,
      },
      { text: body.text },
      { new: true },
    );
    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }
    return comment;
  }

  async replyComment(body: CreateCommentDto, param: IdDto) {
    const comment = await this.commentModel.findById(param.id);
    if (!comment) {
      throw new NotFoundException('Comment does not exist');
    }

    const reply = new this.commentModel({
      ...body,
      videoId: comment.videoId,
      parentCommentId: param.id,
      userId: this.request.user._id,
    });
    return reply.save();
  }

  async viewAllComments(param: IdDto) {
    const videoId = new mongoose.Types.ObjectId(param.id.toString());
    return this.commentModel.aggregate([
      { $match: { videoId } },
      { $sort: { createdAt: -1 } },
      { $project: { __v: 0 } },
    ]);
  }
}
