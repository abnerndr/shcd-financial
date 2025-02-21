import type { CreateGoalDto } from 'src/dto/goal.dto';
import type { Goal } from 'src/entities/goal.entity';

export interface GoalInterface {
  create(req: CreateGoalDto): Promise<Goal>;
  update(id: string, req: CreateGoalDto): Promise<Goal>;
  findById(id: string): Promise<Goal>;
  findAll(): Promise<Goal[]>;
  delete(id: string): Promise<void>;
}
