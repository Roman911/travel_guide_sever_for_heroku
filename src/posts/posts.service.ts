import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleRef } from '@nestjs/core';
import { Post, PostDocument, Posts } from './posts.schema';
import { CreatePostInput } from './inputs/create-post.input';
import { ParamsPostInput } from './inputs/params-post.input';
import { TokenService } from '../token/token.service';
import { LikeInput } from '../likes/inputs/create-like.input';
//import { CommentInput } from '../comments/inputs/create-comment.input'
//import { AnswerCommentInput } from '../comments/inputs/addedAnswer.input'

@Injectable()
export class PostService {
  private tokenService: TokenService;
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}

  async post(postID: string): Promise<Post> {
    const post = this.postModel
      .findById(postID)
      .populate('author')
      .populate('location')
      .exec();

    let { views } = await post;
    views++;

    this.postModel.findByIdAndUpdate(postID, { views }, { new: true }).exec();

    return post;
  }

  async findAll(params: ParamsPostInput): Promise<Post[]> {
    const { page, limit } = params;
    const skip = page === 1 ? 0 : page * limit;
    return this.postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .populate('location')
      .exec();
  }

  async setLike(CreatePostDto: LikeInput): Promise<Post> {
    const { postId, token } = CreatePostDto;

    const post = this.postModel.findById(postId).exec();
    const { likes } = await post;

    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(token);

    let update =
      likes.length !== 0 && likes.includes(userData._id)
        ? { $pull: { likes: userData._id } }
        : { $push: { likes: userData._id } };

    this.postModel.findByIdAndUpdate(postId, update, { new: true }).exec();

    return post;
  }

  async posts(params: ParamsPostInput): Promise<Posts> {
    const { page, limit } = params;
    const skip = page === 1 ? 0 : page * limit;

    const allPosts = await this.postModel.find().exec();
    const posts = await this.postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
      .exec();
    const total_posts = allPosts.length;
    const total_pages = Math.ceil(total_posts / limit);

    return {
      page,
      total_pages,
      total_posts,
      posts: posts,
    };
  }

  async savePost(createPostInput: CreatePostInput): Promise<Post> {
    const { token } = createPostInput;

    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(token);

    return await this.postModel.create({
      ...createPostInput,
      author: userData._id,
    });
  }

  //async addComment(CreatePostDto: CommentInput): Promise<Post> {
  //const { id, token, comment } = CreatePostDto

  //this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
  //const userData = this.tokenService.validateRefreshToken(token)

  //const update = {
  //comments: {
  //author: userData.id,
  //comment
  //}
  //}

  //return this.postModel.findByIdAndUpdate(id, { $push: update }, { new: true }).exec()
  //}

  //async addAnswer(CreatePostDto: AnswerCommentInput): Promise<Post> {
  //const { id, commentId, token, comment } = CreatePostDto

  // this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
  // const userData = this.tokenService.validateRefreshToken(token)

  // const update = {
  // answers: {
  // author: userData.id,
  // comment
  // }
  // }

  // return this.postModel.findById(id).findOneAndUpdate({ comments: commentId }, { $push: update }, { new: true }).exec()
  //}
}
