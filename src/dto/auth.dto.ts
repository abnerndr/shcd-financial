import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
import type { UserDto } from './user.dto';

export class AuthenticationDto {
  user: UserDto;
  access_token: string;
  refresh_token: string;
}

export class RefreshTokenDto {
  @ApiProperty({ type: 'string', required: true })
  @IsEmpty()
  @IsString()
  refresh_token: string;
}
