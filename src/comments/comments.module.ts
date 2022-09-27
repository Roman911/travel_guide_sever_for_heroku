import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsResolver } from './comment.resolver'
import { Comment, CommentSchema } from './comments.schema'
import { CommentsService } from './comments.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ],
  providers: [CommentsResolver, CommentsService]
})
export class CommentsModule { }