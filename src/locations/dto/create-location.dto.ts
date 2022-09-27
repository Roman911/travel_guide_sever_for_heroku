import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@ObjectType()
export class CreateLocationDto {
  @Field()
  _id: string;
  @Field({ nullable: true })
  linkToPost: string;
  @Field()
  title: string;
  @Field()
  small_text: string;
  @Field()
  cover: string;
  @Field()
  isType: string;
  @Field()
  address: string;
  @Field()
  region: string;
  @Field({ nullable: true })
  isTicket: boolean;
  @Field((type) => [String], { nullable: true })
  tickets: string[];
  @Field()
  createdAt: Date;
  @Field((type) => CreateUserDto, { nullable: true })
  author: CreateUserDto;
  @Field(() => Float)
  latitude: number;
  @Field(() => Float)
  longitude: number;
}

@ObjectType()
export class CreateLocationsDto {
  @Field(() => Int)
  total_locations: number;
  @Field((type) => [CreateLocationDto])
  locations: CreateLocationDto[];
}
