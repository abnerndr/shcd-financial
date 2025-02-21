import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import { Subscription } from 'src/entities/subscription.entity';
import { SubscriptionInterface } from 'src/interface/subscription.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class SubscriptionService implements SubscriptionInterface {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: MongoRepository<Subscription>,
  ) {}
  async create(req: CreateSubscriptionDto): Promise<Subscription> {
    const createObject = this.subscriptionRepository.create({
      ...req,
    });
    return await this.subscriptionRepository.save(createObject);
  }
  async update(id: string, req: CreateSubscriptionDto): Promise<Subscription> {
    if (!id) throw new BadRequestException('ID not found');
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }
    const updatedFields = Object.keys(req).reduce((acc, key) => {
      if (req[key] !== subscription[key]) {
        acc[key] = req[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length > 0) {
      await this.subscriptionRepository.update(id, updatedFields);
    }
    return (await this.subscriptionRepository.findOneBy({
      id: subscription.id,
    })) as Subscription;
  }
  async findById(id: string): Promise<Subscription> {
    if (!id) throw new BadRequestException('ID not found');
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (!subscription) throw new BadRequestException('Subscription not found');
    return subscription;
  }
  async findAll(): Promise<Subscription[]> {
    const subscription = await this.subscriptionRepository.find();
    return subscription;
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('ID not found');
    await this.subscriptionRepository.delete(id);
  }
}
