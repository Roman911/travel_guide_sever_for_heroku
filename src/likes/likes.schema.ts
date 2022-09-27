import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/users.schema'

export type LikeDocument = Like & mongoose.Document

@Schema()
export class Like {
  @Prop({ default: new Date })
  createdAt: Date
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export const LikeSchema = SchemaFactory.createForClass(Like)