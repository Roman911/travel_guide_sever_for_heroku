import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class ParamsLocationInput {
  @Field((type) => [String])
  types: string[];
  @Field()
  region: string;
  @Field((type) => [[Float], [Float]] || [])
  debounced: [number[], number[]] | [];
}
