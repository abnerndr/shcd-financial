import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
import type { User } from 'src/entities/user.entity';

export class RegisterUserDto {
  @ApiProperty({
    title: 'name',
    example: 'John Doe',
  })
  @IsEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'email',
    example: 'example@email.com',
  })
  @IsEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    title: 'document_number',
    example: '11122233344',
  })
  @IsEmpty()
  @IsString()
  document_number: string;

  @ApiProperty({
    title: 'birthdate',
    example: '2001-01-30',
  })
  @IsEmpty()
  @IsString()
  birthdate: string;

  @ApiProperty({
    title: 'password',
    example: '',
  })
  @IsEmpty()
  @IsString()
  password: string;
}

export class UserDto {
  _id: string;
  name: string;
  email: string;
  birthdate: string;

  constructor(user: User) {
    this._id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
    this.birthdate = user.birthdate;
  }

  toObject(): Record<string, any> {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      birthdate: this.birthdate,
    };
  }
}
