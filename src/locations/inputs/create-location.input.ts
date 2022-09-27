import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field()
  title: string;
  @Field()
  small_text: string;
  @Field()
  isType: string;
  @Field()
  address: string;
  @Field()
  region: string;
  @Field()
  cover: string;
  @Field()
  isTicket: boolean;
  @Field((type) => [String])
  tickets: string[];
  @Field((type) => Float)
  latitude: number;
  @Field((type) => Float)
  longitude: number;
  @Field()
  token: string;
}
