import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { BankModule } from './domain/bank/bank.module';
import { ExpenseModule } from './domain/expense/expense.module';
import { GoalModule } from './domain/goal/goal.module';
import { SubscriptionModule } from './domain/subscription/subscription.module';
import { UserModule } from './domain/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UserModule,
    BankModule,
    SubscriptionModule,
    ExpenseModule,
    GoalModule,
  ],
})
export class AppModule {}
