import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field()
  small_text: string;
  @Field()
  region: string;
  @Field()
  cover: string;
  @Field()
  token: string;
  @Field((type) => [String])
  tags: string[];
  @Field()
  type_material: string;
  @Field()
  location: string;
  @Field()
  editor: string;
  @Field()
  link: string;
  @Field()
  work_time: string;
  @Field()
  how_to_get_there: string;
}
