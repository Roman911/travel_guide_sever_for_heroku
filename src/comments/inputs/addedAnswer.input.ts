import { InputType, Field, ID } from '@nestjs/graphql'

@InputType()
export class AnswerCommentInput {
  @Field(type => ID)
  id: string
  @Field()
  comment: string
  @Field()
  token: string
}