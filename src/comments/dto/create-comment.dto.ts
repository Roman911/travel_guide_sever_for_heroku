import { ObjectType, Field, Int, ID } from '@nestjs/graphql'
import { CreateUserDto } from '../../users/dto/create-user.dto'

@ObjectType()
class Answer {
  @Field(() => ID)
  _id: string
  @Field({ nullable: true })
  comment: string
  @Field(() => Int)
  rating: number
  @Field({ nullable: true })
  createdAt: Date
  @Field(type => CreateUserDto, { nullable: true })
  author: CreateUserDto
}

@ObjectType()
export class CreateCommentDto {
  @Field(() => ID)
  _id: string
  @Field()
  postId: string
  @Field()
  comment: string
  @Field(type => [Answer])
  answers: Answer[]
  @Field(() => Int)
  rating: number
  @Field({ nullable: true })
  last_seen: Date
  @Field()
  createdAt: Date
  @Field(type => CreateUserDto, { nullable: true })
  author: CreateUserDto
}