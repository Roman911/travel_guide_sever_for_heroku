import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import {
  SharpPipeAvatar,
  SharpPipeForLocation,
  SharpPipeForPost,
  SharpForCreatePost,
  SharpTransformImage,
  SharpMarker,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile(SharpPipeForLocation) image: string) {
    return { image };
  }

  @Post('/create-post')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile(SharpPipeForPost) image: string) {
    return { image };
  }

  @Post('/create-post-content')
  @UseInterceptors(FileInterceptor('image'))
  uploadImageForPost(@UploadedFile(SharpForCreatePost) image: string) {
    return { link: image };
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('image'))
  uploadAvatar(@UploadedFile(SharpPipeAvatar) image: string) {
    return { image };
  }

  @Post('/transormImage')
  @UseInterceptors(FileInterceptor('image'))
  uploadContent(@UploadedFile(SharpTransformImage) image: string) {
    return { image };
  }

  @Post('/marker')
  @UseInterceptors(FileInterceptor('image'))
  uploadMarker(@UploadedFile(SharpMarker) image: string) {
    return { image };
  }
}
