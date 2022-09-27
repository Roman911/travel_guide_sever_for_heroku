import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsResolver } from './post.resolver'
import { Post, PostSchema } from './posts.schema'
import { PostService } from './posts.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
  ],
  providers: [PostsResolver, PostService]
})
export class PostsModule { }