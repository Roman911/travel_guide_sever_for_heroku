import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { CreatePostDto, CreatePostsDto } from './dto/create-post.dto';
import { Post, PostDocument } from './posts.schema';
import { ParamsPostInput } from './inputs/params-post.input';
import { CreatePostInput } from './inputs/create-post.input';
import { LikeInput } from '../likes/inputs/create-like.input';
//import { CommentInput } from '../comments/inputs/create-comment.input'
//import { AnswerCommentInput } from '../comments/inputs/addedAnswer.input'

@Resolver()
export class PostsResolver {
  constructor(
    private postsService: PostService,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  @Query(() => CreatePostsDto)
  async postsAndParams(@Args('input') input: ParamsPostInput) {
    return this.postsService.posts(input);
  }

  @Query(() => [CreatePostDto])
  async posts(@Args('input') input: ParamsPostInput) {
    return this.postsService.findAll(input);
  }

  @Query(() => CreatePostDto)
  async post(@Args('postID') postID: string) {
    return this.postsService.post(postID);
  }

  @Mutation(() => CreatePostDto)
  async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.savePost(input);
  }

  @Mutation(() => CreatePostDto)
  async setLikeForPost(@Args('input') input: LikeInput) {
    return this.postsService.setLike(input);
  }

  //@Mutation(() => CreatePostDto)
  //async addCommentForPost(@Args('input') input: CommentInput) {
  // return this.postsService.addComment(input)
  //}

  //@Mutation(() => CreatePostDto)
  //async addAnswerForComment(@Args('input') input: AnswerCommentInput) {
  // return this.postsService.addAnswer(input)
  //}
}
