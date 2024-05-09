import { Module } from '@nestjs/common';
import { CommentsModule } from './modules/comments/comments.module';
import { VideosModule } from './modules/videos/videos.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { CommentsController } from './modules/comments/comments.controller';
import { VideosController } from './modules/videos/videos.controller';
import { RatingsController } from './modules/ratings/ratings.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './global/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().dbConfig.dbUrl),
    CommentsModule,
    VideosModule,
    RatingsModule,
    AuthModule,
  ],
  controllers: [CommentsController, VideosController, RatingsController],
  providers: [],
})
export class AppModule {}
