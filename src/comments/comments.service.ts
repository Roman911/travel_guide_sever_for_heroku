import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ModuleRef } from "@nestjs/core"
import { Comment, CommentDocument } from './comments.schema'
import { CommentInput } from './inputs/create-comment.input'
import { AnswerCommentInput } from './inputs/addedAnswer.input'
import { TokenService } from '../token/token.service'

@Injectable()
export class CommentsService {
  private tokenService: TokenService
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>
  ) { }

  async saveComment(createCommentDto: CommentInput): Promise<Comment> {
    const { postId, token, comment } = createCommentDto

    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
    const userData = this.tokenService.validateRefreshToken(token)

    return await this.commentModel.create({ postId, author: userData._id, comment })
  }

  async addedAnswer(createCommentDto: AnswerCommentInput): Promise<Comment> {
    const { id, comment, token } = createCommentDto

    this.tokenService = await this.moduleRef.get(TokenService, { strict: false })
    const userData = this.tokenService.validateRefreshToken(token)

    const update = {
      answers: {
        author: userData._id,
        comment
      }
    }

    return await this.commentModel.findByIdAndUpdate(id, { $push: update }, { new: true })
  }

  async findAll(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).sort({ createdAt: -1 }).populate('author').populate('answers.author').exec()
  }
}