
import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { GoogleLoginDto } from 'src/dto/googleLogin.dto';
import { GoogleAuthGuard } from 'src/common/guards/googleAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async LogIn(@Body() loginDto: LoginDto) {
    return await this.authService.LogIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async Register(@Body() registerDto: RegisterDto) {
    return await this.authService.Register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  @Post('googleLogin')
  async GoogleLogin(@Body() dto : GoogleLoginDto ) {
    return await this.authService.GoogleLogin(dto);
  }

}
