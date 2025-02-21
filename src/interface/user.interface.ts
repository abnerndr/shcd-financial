import type { RegisterUserDto } from 'src/dto/user.dto';
import type { User } from 'src/entities/user.entity';

export interface UserInterface {
  create(req: RegisterUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
