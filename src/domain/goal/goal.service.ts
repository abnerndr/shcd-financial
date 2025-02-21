import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoalDto } from 'src/dto/goal.dto';
import { Goal } from 'src/entities/goal.entity';
import { GoalInterface } from 'src/interface/goal.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class GoalService implements GoalInterface {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: MongoRepository<Goal>,
  ) {}
  async create(req: CreateGoalDto): Promise<Goal> {
    const createObject = this.goalRepository.create({
      ...req,
    });
    return await this.goalRepository.save(createObject);
  }
  async update(id: string, req: CreateGoalDto): Promise<Goal> {
    if (!id) throw new BadRequestException('ID not found');
    const goal = await this.goalRepository.findOneBy({ id });
    if (!goal) {
      throw new BadRequestException('Goal not found');
    }
    const updatedFields = Object.keys(req).reduce((acc, key) => {
      if (req[key] !== goal[key]) {
        acc[key] = req[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length > 0) {
      await this.goalRepository.update(id, updatedFields);
    }
    return (await this.goalRepository.findOneBy({
      id: goal.id,
    })) as Goal;
  }
  async findById(id: string): Promise<Goal> {
    if (!id) throw new BadRequestException('ID not found');
    const goal = await this.goalRepository.findOneBy({ id });
    if (!goal) throw new BadRequestException('Goal not found');
    return goal;
  }
  async findAll(): Promise<Goal[]> {
    const goal = await this.goalRepository.find();
    return goal;
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('ID not found');
    await this.goalRepository.delete(id);
  }
}
