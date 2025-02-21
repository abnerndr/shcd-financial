import { Module } from '@nestjs/common';
import { BankService } from './bank.service';

@Module({
  imports: [],
  providers: [BankService, { provide: 'BankInterface', useClass: BankService }],
  exports: ['BankInterface'],
})
export class BankModule {}
