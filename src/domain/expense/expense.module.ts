import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Module({
  imports: [],
  providers: [
    ExpenseService,
    { provide: 'ExpenseInterface', useClass: ExpenseService },
  ],
  exports: ['ExpenseInterface'],
})
export class ExpenseModule {}
