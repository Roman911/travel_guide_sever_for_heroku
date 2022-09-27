import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class ParamsPostInput {
  @Field((type) => Int)
  limit: number
  @Field((type) => Int)
  page: number
}