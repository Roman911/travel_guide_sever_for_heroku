import { ObjectType, Field, Int } from '@nestjs/graphql'
import { CreateUserDto } from '../../users/dto/create-user.dto'

@ObjectType()
export class CreateLikeDto {
  @Field()
  _id: string
  @Field(type => CreateUserDto, { nullable: true })
  user: CreateUserDto
  @Field()
  createdAt: Date
}