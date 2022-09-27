import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleRef } from '@nestjs/core';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { User, UserData, UserDocument } from './users.schema';
import {
  LoginUserInput,
  RegistrationUserInput,
  UpdateUserInput,
  UpdateUserAvatarInput,
} from './inputs';
import { TokenService } from '../token/token.service';
import { MailService } from '../mail/mail.service';
import { UserTokenService } from './user-token.service';

@Injectable()
export class UsersService {
  private userTokenService: UserTokenService;
  private tokenService: TokenService;
  private mailService: MailService;
  constructor(
    private moduleRef: ModuleRef,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async user(userID: string): Promise<User> {
    return await this.userModel.findById(userID).exec();
  }

  async author(_id: string): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async activate(activationLink: string): Promise<any> {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) throw new BadRequestException(`Некоректний лінк активації`);
    user.isActivated = true;
    user.activationLink = null;
    await user.save();
    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }

  async login(createUserDto: LoginUserInput): Promise<any> {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Неправильний логін або пароль');
    if (!user.isActivated)
      throw new BadRequestException('Потрібно активувати акаунт');
    const isPassEquals = await compare(password, user.password);
    if (!isPassEquals)
      throw new BadRequestException('Неправильний логін або пароль');
    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }

  async logout(refreshToken: string): Promise<any> {
    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });

    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<any> {
    if (!refreshToken) throw new BadRequestException();
    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw new BadRequestException();
    const user = await this.userModel.findById(userData._id);
    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }

  async registration(createUserDto: RegistrationUserInput): Promise<any> {
    const { email, password, name } = createUserDto;
    const candidate = await this.userModel.findOne({ email });
    if (candidate)
      throw new BadRequestException(
        `Користувач з таким емейлом вже зареестрований`,
      );
    const hashPassword = await hash(password, 10);
    const activationLink = v4();
    const user = await this.userModel.create({
      email,
      name,
      password: hashPassword,
      activationLink,
    });
    this.mailService = await this.moduleRef.get(MailService, { strict: false });
    await this.mailService.sendActivationMail(
      email,
      `${process.env.CLIENT_URL}/activate/${activationLink}`,
    );
    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUserData(createUserDto: UpdateUserInput): Promise<any> {
    const { token, name, aboutMy, socials } = createUserDto;

    const update = {
      name,
      aboutMy,
      socials,
    };

    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(token);
    await this.userModel
      .findByIdAndUpdate(userData._id, update, { new: true })
      .exec();
    const user = await this.userModel.findById(userData._id).exec();

    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }

  async updateUserAvatar(createUserDto: UpdateUserAvatarInput): Promise<any> {
    const { token, avatar } = createUserDto;

    this.tokenService = await this.moduleRef.get(TokenService, {
      strict: false,
    });
    const userData = this.tokenService.validateRefreshToken(token);

    const user = await this.userModel.findById(userData._id).exec();
    const isAvatar = user.avatars.includes(avatar);

    const update = isAvatar
      ? { avatar }
      : { $push: { avatars: avatar }, avatar };

    await this.userModel
      .findByIdAndUpdate(userData._id, update, { new: true })
      .exec();

    this.userTokenService = await this.moduleRef.get(UserTokenService, {
      strict: false,
    });

    return await this.userTokenService.userTokenData(user);
  }
}
