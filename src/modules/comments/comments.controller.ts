import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IdDto } from 'src/global/common.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create/:id')
  createComment(@Body() body: CreateCommentDto, @Param() param: IdDto) {
    return this.commentsService.createComment(body, param);
  }
}
