import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { URL } from './auth.constants';
import { IResponse } from 'src/interfaces';

ConfigModule.forRoot({
  envFilePath: './.env',
});

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async verifyTokenGoogle(token: string, email: string): Promise<IResponse> {
    try {
      const payload = await lastValueFrom(this.httpService.get(URL + token));
      console.log({ data: payload.data });
      console.log(payload.data.email);
      if (payload.data.email === email) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Account verified',
        };
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorize');
    }
  }
}
