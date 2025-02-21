import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { UserInterface } from 'src/interface/user.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService implements UserInterface {
  private logger: Logger;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async create(req: RegisterUserDto): Promise<User> {
    const createObject = this.userRepository.create({
      ...req,
    });
    return await this.userRepository.save(createObject);
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Email não informado');
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return user;
  }
}
