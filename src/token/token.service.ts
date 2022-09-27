import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign, verify } from 'jsonwebtoken';
import { Token, TokenDocument } from './token.schema';
import { TokenInput } from './inputs/token.input';

interface IFgg {
  email: string;
  _id: string;
  name: string;
  isActivated: boolean;
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  static generateTokens(payload: {
    name: string;
    _id: string;
    isActivated: boolean;
    email: string;
  }) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    return verify(token, process.env.JWT_ACCESS_SECRET);
  }

  validateRefreshToken(token: string): IFgg {
    return <IFgg>verify(token, process.env.JWT_REFRESH_SECRET);
  }

  async saveToken(createTokenDto: TokenInput): Promise<Token> {
    const { userId, refreshToken } = createTokenDto;
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await this.tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string): Promise<any> {
    return this.tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string): Promise<any> {
    return this.tokenModel.findOne({ refreshToken });
  }
}
