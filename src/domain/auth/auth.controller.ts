/* eslint-disable @typescript-eslint/no-misused-promises */
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthenticationDto, RefreshTokenDto } from 'src/dto/auth.dto';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Register a new user',
  })
  @ApiBody({ type: RegisterUserDto, required: true })
  @ApiResponse({ description: 'User created with successful', status: 201 })
  @ApiResponse({ description: 'Bad Request Exception', status: 400 })
  @ApiResponse({ description: 'Internal Server Error', status: 500 })
  @Post('register')
  async register(
    @Body() payload: RegisterUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.authService.register(payload);
  }

  @ApiOperation({
    description: 'Authenticate and generate jwt',
  })
  @ApiBody({ type: LoginDto, required: true })
  @ApiResponse({
    description: 'Is Authenticated',
    status: 200,
    type: AuthenticationDto,
  })
  @ApiResponse({ description: 'Bad Request Exception', status: 400 })
  @ApiResponse({ description: 'Internal Server Error', status: 500 })
  @Post('login')
  async login(@Body() payload: LoginDto): Promise<AuthenticationDto> {
    return await this.authService.authenticate(payload);
  }

  @ApiOperation({
    description: 'RefreshToken',
  })
  @ApiBody({ type: RefreshTokenDto, required: true })
  @ApiResponse({
    description: 'Is Refreshed',
    status: 200,
    type: String,
  })
  @ApiResponse({ description: 'Bad Request Exception', status: 400 })
  @ApiResponse({ description: 'Internal Server Error', status: 500 })
  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);
    return { access_token: newAccessToken };
  }

  @ApiOperation({
    description: 'Valid the JWT token',
  })
  @ApiBearerAuth('access_token')
  @ApiResponse({
    description: 'Is Valid',
    status: 200,
  })
  @ApiResponse({ description: 'Bad Request Exception', status: 400 })
  @ApiResponse({ description: 'Internal Server Error', status: 500 })
  @Get('validate')
  getProtectedResource(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'
    return { is_valid: !!this.authService.validateToken(token) };
  }
}
