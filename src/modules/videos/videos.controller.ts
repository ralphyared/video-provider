import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { GetVideosDto } from './dto/get-videos.dto';
import { IdDto } from 'src/global/common.dto';
import { Public } from 'src/global/custom-decorators';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/play/:id')
  async playVideo(@Param() param: IdDto) {
    return this.videosService.playVideo(param);
  }

  @Post('/create')
  async createVideo(@Body() body: CreateVideoDto) {
    return this.videosService.createVideo(body);
  }

  @Public()
  @Get('/all')
  async getVideos(@Query() query: GetVideosDto) {
    return this.videosService.getVideos(query);
  }
}
