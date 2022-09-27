import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class LikeInput {
  @Field()
  postId: string
  @Field()
  token: string
}