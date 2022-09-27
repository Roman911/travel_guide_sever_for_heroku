import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserDataDto } from './dto/create-user.dto';
import {
  LoginUserInput,
  RegistrationUserInput,
  UpdateUserInput,
  UpdateUserAvatarInput,
} from './inputs';
import { User, UserDocument } from './users.schema';

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private moduleRef: ModuleRef,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  @Query(() => [CreateUserDto])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => CreateUserDto)
  async user(@Args('userID') userID: string) {
    return this.usersService.user(userID);
  }

  @Query(() => CreateUserDto)
  async author(@Args('_id') _id: string) {
    return this.usersService.author(_id);
  }

  @Query(() => CreateUserDataDto)
  async activate(@Args('activationLink') activationLink: string) {
    return await this.usersService.activate(activationLink);
  }

  @Query(() => CreateUserDataDto)
  async login(@Args('input') input: LoginUserInput) {
    return await this.usersService.login(input);
  }

  @Query(() => CreateUserDataDto)
  async logout(@Args('refreshToken') refreshToken: string) {
    return await this.usersService.logout(refreshToken);
  }

  @Query(() => CreateUserDataDto)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return await this.usersService.refresh(refreshToken);
  }

  @Mutation(() => CreateUserDataDto)
  async registration(@Args('input') input: RegistrationUserInput) {
    return await this.usersService.registration(input);
  }

  @Mutation(() => CreateUserDataDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.usersService.updateUserData(input);
  }

  @Mutation(() => CreateUserDataDto)
  async updateUserAvatar(@Args('input') input: UpdateUserAvatarInput) {
    return await this.usersService.updateUserAvatar(input);
  }
}
