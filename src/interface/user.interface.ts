import type { RegisterUserDto, UserDto } from 'src/dto/user.dto';
import type { User } from 'src/entities/user.entity';

export interface UserInterface {
  create(req: RegisterUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto>;
  update(id: string, req: RegisterUserDto): Promise<UserDto>;
  delete(id: string): Promise<void>;
}
