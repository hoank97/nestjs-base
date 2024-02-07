import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { LoggingService } from 'src/commons/logging/logger.service';
import { hashData, verifyHashed } from 'src/commons/utilities';
import { AuthErrorMessage, CacheInShortTime } from './auth.constants';
import { JwtPayload } from './auth.type';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { RedisCacheService } from '../cache/cache.services';
import { User } from '../users/entities/user.entity';
config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly loggingService: LoggingService,
    private readonly cacheService: RedisCacheService,
  ) {}

  async register(payload: RegisterDto) {
    // Avoid race condition
    const isDuplicate = this.cacheService.get(payload.email);
    if (isDuplicate) {
      throw new BadRequestException(AuthErrorMessage.EMAIL_ALREADY_EXIST);
    }
    this.cacheService.set(payload.email, 1, CacheInShortTime);

    await this.throwErrorIfEmailExist(payload.email);
    const hashedPassword = await hashData(payload.password);
    const newUser = new this.userModel({
      email: payload.email,
      password: hashedPassword,
    });

    await newUser.save();
    const { accessToken, refreshToken } = this.generateToken(payload.email);
    this.cacheService.set(newUser.id, refreshToken, Number(process.env.JWT_CACHE_REFRESH_TOKEN));

    return { accessToken, refreshToken };
  }

  async login(payload: LoginDto) {
    const user = await this.getOrThrowErrorIfEmailNotExist(payload.email);
    const verifyPassword = await verifyHashed(payload.password, user.password);
    if (!verifyPassword) {
      throw new BadRequestException(AuthErrorMessage.PASSWORD_INCORRECT);
    }

    const { accessToken, refreshToken } = this.generateToken(payload.email);
    this.cacheService.set(user._id, refreshToken, Number(process.env.JWT_CACHE_REFRESH_TOKEN));

    return { accessToken, refreshToken };
  }

  async getNewToken(payload: RefreshTokenDto) {
    const data = this.verifyToken(payload.refreshToken);
    const newAccessToken = this.generateJwtToken(data, process.env.JWT_ACCESS_TOKEN_EXPIRED);

    return { accessToken: newAccessToken };
  }

  async logout(email: string) {
    const user = await this.getOrThrowErrorIfEmailNotExist(email);
    this.cacheService.del(user._id);

    return { logout: 'successful' };
  }

  // async findDetail(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  // async findAll(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  // Helper region
  private async throwErrorIfEmailExist(email: string): Promise<void> {
    const isExist = await this.userModel.exists({ email });
    if (isExist) {
      throw new BadRequestException(AuthErrorMessage.EMAIL_ALREADY_EXIST);
    }
  }

  private async getOrThrowErrorIfEmailNotExist(email: string): Promise<User> {
    const userExist = await this.userModel.findOne({ email });
    if (!userExist) {
      throw new BadRequestException(AuthErrorMessage.EMAIL_NOT_EXIST);
    }

    return userExist;
  }

  private generateJwtToken(info: JwtPayload, expiresIn: string): string {
    return jwt.sign(info, process.env.JWT_SECRET, { expiresIn });
  }

  private verifyToken(refreshToken: string): JwtPayload {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

      return payload as unknown as JwtPayload;
    } catch (err) {
      this.loggingService.error(AuthService.name, err);
      throw new BadRequestException(AuthErrorMessage.TOKEN_EXPIRED);
    }
  }

  private generateToken(email: string) {
    const jwtPayload: JwtPayload = { email };
    const accessToken = this.generateJwtToken(jwtPayload, process.env.JWT_ACCESS_TOKEN_EXPIRED);
    const refreshToken = this.generateJwtToken(jwtPayload, process.env.JWT_REFRESH_TOKEN_EXPIRED);

    return { accessToken, refreshToken };
  }
  // End helper
}
