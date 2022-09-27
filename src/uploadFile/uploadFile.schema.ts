import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/users.schema'

export type UploadDocument = Upload & mongoose.Document

@Schema()
export class Upload {
  @Prop()
  name: string
  @Prop()
  url: string
  @Prop({ default: new Date })
  createdAt: Date
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User
}

export const UploadSchema = SchemaFactory.createForClass(Upload)