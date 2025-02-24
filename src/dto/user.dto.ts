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
  document_number: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this._id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
    this.birthdate = user.birthdate;
    this.document_number = user.document_number;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

  toObject(): Record<string, any> {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      birthdate: this.birthdate,
      document_number: this.document_number,
      created_at: this.created_at,
    };
  }
}

export class UserLoginDto {
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

export class UserUpdateDto {
  @ApiProperty({
    title: 'name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    title: 'email',
    example: 'example@email.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    title: 'birthdate',
    example: '2001-01-30',
  })
  @IsString()
  birthdate: string;

  @ApiProperty({
    title: 'document_number',
    example: '',
  })
  @IsString()
  document_number: string;
}
