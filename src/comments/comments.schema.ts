import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { User } from '../users/users.schema'

export type CommentDocument = Comment & mongoose.Document

@Schema()
class Answer {
  @Prop()
  comment: String
  @Prop({ default: 0 })
  rating: number
  @Prop({ default: new Date })
  createdAt: Date
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User
}

const AnswerSchema = SchemaFactory.createForClass(Answer)

@Schema()
export class Comment {
  @Prop()
  postId: string
  @Prop()
  comment: string
  @Prop({ type: [AnswerSchema], default: [] })
  answers: Answer[]
  @Prop({ default: 0 })
  rating: number
  @Prop({ default: new Date })
  last_seen: Date
  @Prop({ default: new Date })
  createdAt: Date
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User
}

export const CommentSchema = SchemaFactory.createForClass(Comment)