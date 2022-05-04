import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interface';
import { LoginDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userModel.findOne({ email: dto.email });

    if (exists)
      throw new HttpException(
        'Email is already registered to an account',
        HttpStatus.CONFLICT,
      );

    const user = new this.userModel(dto);
    const hashed = await argon.hash(dto.password);
    user.password = hashed;

    await user.save();

    return this.signToken(user._id, user.email);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new HttpException('User account not found', HttpStatus.NOT_FOUND);

    const match = await argon.verify(user.password, password);
    if (!match)
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);

    return this.signToken(user._id, user.email);
  }

  // Generate new access token if valid refresh token is sent in header
  async getNewAccessToken(headers: Headers) {
    const bearer =
      headers['authorization'] && headers['authorization'].split(' ')[1];
    if (!bearer)
      throw new HttpException(
        'Authorization header not found',
        HttpStatus.NOT_FOUND,
      );
    try {
      const payload = this.jwt.verify(bearer, {
        secret: process.env.REFRESH_SECRET,
      });
      const { access_token } = this.signToken(payload.sub, payload.email);
      return { access_token };
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  // Generates access and refresh tokens
  signToken(
    userId,
    email: string,
  ): { access_token: string; refresh_token: string } {
    const payload = {
      sub: userId,
      email: email,
    };
    const token = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: process.env.ACCESS_SECRET,
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: '7d',
      secret: process.env.REFRESH_SECRET,
    });

    return { access_token: token, refresh_token: refreshToken };
  }
}
