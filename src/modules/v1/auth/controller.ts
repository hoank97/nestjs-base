/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
import { CreateAuthDto } from './dto/create-auth';
import { UpdateAuthDto } from './dto/update-auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    //
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const rs = this.authService.googleLogin(req);
    console.log(rs);
  }

  @ApiQuery({
    name: 'token',
    type: String,
  })
  @ApiQuery({
    name: 'email',
    type: String,
  })
  @Get('google/verify')
  async verifyTokenGoogle(
    @Query('token') token: string,
    @Query('email') email: string,
  ) {
    return this.authService.verifyTokenGoogle(token, email);
  }
}
