import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, MinLength, MaxLength } from 'class-validator'

@InputType()
export class RegistrationUserInput {
  @Field()
  @MinLength(3)
  @MaxLength(10)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  @MaxLength(20)
  password: string
}