import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Socials {
  @Field({ nullable: true })
  facebook: string;
  @Field({ nullable: true })
  instagram: string;
  @Field({ nullable: true })
  twitter: string;
  @Field({ nullable: true })
  youtube: string;
  @Field({ nullable: true })
  telegram: string;
}

@ObjectType()
export class CreateUserDto {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  isActivated: boolean;
  @Field()
  activationLink: string;
  @Field({ nullable: true })
  avatar: string;
  @Field((type) => [String], { nullable: true })
  avatars: string[];
  @Field(() => Int, { nullable: true })
  rating: number;
  @Field({ nullable: true })
  aboutMy: string;
  @Field({ nullable: true })
  socials: Socials;
  @Field({ nullable: true })
  last_seen: Date;
}

@ObjectType()
export class CreateUserDataDto {
  @Field()
  user: CreateUserDto;
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}

@ObjectType()
export class ActivateUserDto {
  @Field(() => ID)
  _id: string;
}
