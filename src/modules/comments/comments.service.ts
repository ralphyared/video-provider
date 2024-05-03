import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdDto } from 'src/global/common.dto';
import { Comment } from './comments.schema';
import { VideosService } from '../videos/videos.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private videosService: VideosService,
  ) {}

  async createComment(body: CreateCommentDto, param: IdDto) {
    const video = await this.videosService.findVideoById(param.id);
    if (!video) {
      throw new NotFoundException('Video does not exist');
    }

    const comment = new this.commentModel({ ...body, videoId: param.id });
    return comment.save();
  }
}
