import type { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import type { Subscription } from 'src/entities/subscription.entity';

export interface SubscriptionInterface {
  create(req: CreateSubscriptionDto): Promise<Subscription>;
  update(id: string, req: CreateSubscriptionDto): Promise<Subscription>;
  findById(id: string): Promise<Subscription>;
  findAll(): Promise<Subscription[]>;
  delete(id: string): Promise<void>;
}
