import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';

@Module({
  imports: [],
  providers: [GoalService, { provide: 'GoalInterface', useClass: GoalService }],
  exports: ['GoalInterface'],
})
export class GoalModule {}
