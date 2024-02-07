import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('refresh-token')
  getNewToken(@Body() payload: RefreshTokenDto) {
    return this.authService.getNewToken(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Request() req) {
    return this.authService.logout(req.email);
  }
}
