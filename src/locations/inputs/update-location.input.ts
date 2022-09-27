import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateLinkToPostInput {
  @Field()
  locationID: string;
  @Field()
  linkToPost: string;
}
