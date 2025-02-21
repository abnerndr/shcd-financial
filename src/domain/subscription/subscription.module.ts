import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [],
  providers: [
    SubscriptionService,
    { provide: 'SubscriptionInterface', useClass: SubscriptionService },
  ],
  exports: ['SubscriptionInterface'],
})
export class SubscriptionModule {}
