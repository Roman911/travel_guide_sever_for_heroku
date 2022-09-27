import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CommentInput {
  @Field()
  postId: string
  @Field()
  comment: string
  @Field()
  token: string
}