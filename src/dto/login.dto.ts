import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    title: 'email',
    example: 'example@email.com',
  })
  @IsEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    title: 'password',
    example: '*******',
  })
  @IsEmpty()
  @IsString()
  password: string;
}
