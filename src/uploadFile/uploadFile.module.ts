import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UploadResolver } from './uploadFile.resolver'
import { Upload, UploadSchema } from './uploadFile.schema'
import { UploadService } from './uploadFile.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }])
  ],
  providers: [UploadResolver, UploadService]
})
export class UploadModule { }