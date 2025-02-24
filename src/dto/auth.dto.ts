import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
import type { UserLoginDto } from './user.dto';

export class AuthenticationDto {
  user: UserLoginDto;
  access_token: string;
  refresh_token: string;
}

export class RefreshTokenDto {
  @ApiProperty({ type: 'string', required: true })
  @IsEmpty()
  @IsString()
  refresh_token: string;
}
