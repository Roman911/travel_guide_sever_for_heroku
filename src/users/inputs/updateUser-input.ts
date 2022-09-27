import { InputType, Field } from '@nestjs/graphql';
//import { Socials } from '../dto/create-user.dto'

@InputType()
class Socialss {
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

@InputType()
export class UpdateUserInput {
  @Field()
  token: string;
  @Field()
  name: string;
  @Field()
  aboutMy: string;
  @Field()
  socials: Socialss;
}

@InputType()
export class UpdateUserAvatarInput {
  @Field()
  token: string;
  @Field()
  avatar: string;
}
