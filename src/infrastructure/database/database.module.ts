import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'rxjs';
import { Bank } from 'src/entities/bank.entity';
import { Expense } from 'src/entities/expense.entity';
import { Goal } from 'src/entities/goal.entity';
import { User } from 'src/entities/user.entity';
import { DatabaseClientService } from './database.client';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseClientService,
      inject: [DatabaseClientService],
    }),
    TypeOrmModule.forFeature([User, Bank, Subscription, Expense, Goal]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
