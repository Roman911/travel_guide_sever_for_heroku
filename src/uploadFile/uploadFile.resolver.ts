import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UploadService } from './uploadFile.service';
import { CreateUploadDto } from './dto/create-uploadFile.dto';
import { Upload, UploadDocument } from './uploadFile.schema';

@Resolver()
export class UploadResolver {
  constructor(
    private uploadService: UploadService,
    @InjectModel(Upload.name)
    private uploadModel: Model<UploadDocument>,
  ) {}

  @Query(() => CreateUploadDto)
  async cover(@Args('fileID') fileID: string) {
    return this.uploadService.file(fileID);
  }
}
