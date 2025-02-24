/* eslint-disable  */

import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticationDto } from 'src/dto/auth.dto';
import { LoginDto } from 'src/dto/login.dto';
import { RegisterUserDto, UserLoginDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { UserInterface } from 'src/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserInterface') private usersService: UserInterface,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async authenticate(req: LoginDto): Promise<AuthenticationDto> {
    if (!req.email || !req.password) {
      throw new BadRequestException('Email or Password not found');
    }
    const user = await this.validateUser(req.email, req.password);
    if (!user) throw new BadRequestException('Email or password is invalid');
    const token = await this.login(user as User);
    const newUser = new UserLoginDto(user as User);
    return {
      user: newUser,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  async register(req: RegisterUserDto): Promise<User> {
    try {
      await this.usersService.findByEmail(req.email);
      throw new BadRequestException('User already exists');
    } catch (error) {
      req.password = await bcrypt.hash(req.password, 10);
      const newUser = await this.usersService.create(req);
      const { password, ...rest } = newUser;
      return rest as User;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const newAccessToken = this.jwtService.sign({ sub: payload.sub });
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      // Verify the token using the secret
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return true; // Token is valid
    } catch (error) {
      // Handle token verification errors
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken(user._id.toString());
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  private generateRefreshToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
  }
}
