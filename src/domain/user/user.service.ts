import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { RegisterUserDto, UserDto, type UserUpdateDto } from 'src/dto/user.dto';
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

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserDto(user));
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return new UserDto(user);
  }

  async update(id: string, req: UserUpdateDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ _id: id });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const updateObject = this.getUpdatedFields(user, req);
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateObject,
    });
    return new UserDto(updatedUser);
  }
  private getUpdatedFields(user: User, req: UserUpdateDto): Partial<User> {
    const fieldsToUpdate: Partial<User> = {};

    for (const key of Object.keys(req)) {
      if (req[key] && req[key] !== user[key]) {
        fieldsToUpdate[key] = req[key];
      }
    }

    return fieldsToUpdate;
  }
  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    await this.userRepository.delete(user);
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
