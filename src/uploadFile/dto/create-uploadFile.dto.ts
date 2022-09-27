import { ObjectType, Field } from '@nestjs/graphql';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@ObjectType()
export class CreateUploadDto {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  url: string;
  @Field()
  createdAt: Date;
  @Field((type) => CreateUserDto, { nullable: true })
  author: CreateUserDto;
}
