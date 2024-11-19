import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}