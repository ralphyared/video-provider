import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IdDto } from 'src/global/common.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create/:id')
  async createComment(@Body() body: CreateCommentDto, @Param() param: IdDto) {
    return this.commentsService.createComment(body, param);
  }

  @Post('reply/:id')
  async replyComment(@Body() body: CreateCommentDto, @Param() param: IdDto) {
    return this.commentsService.replyComment(body, param);
  }

  @Put('update/:id')
  async updateComment(@Body() body: UpdateCommentDto, @Param() param: IdDto) {
    return this.commentsService.updateComment(body, param);
  }

  @Get('view/:id')
  async viewAllComments(@Param() param: IdDto) {
    return this.commentsService.viewAllComments(param);
  }
}
