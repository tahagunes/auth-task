//src/auth/auth.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    // console.log("autha controllera login istek geldi",email,password);
    return this.authService.login(email, password);
  }

  @Get('AuthUserId')
  getUserId() {
    return this.authService.findAuthUserId();
  }
}