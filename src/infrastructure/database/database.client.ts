import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmOptionsFactory,
  type TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Subscription } from 'rxjs';
import { Bank } from 'src/entities/bank.entity';
import { Expense } from 'src/entities/expense.entity';
import { Goal } from 'src/entities/goal.entity';
import { User } from 'src/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseClientService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options: DataSourceOptions = {
      type: 'mongodb',
      url: this.configService.get<string>('MONGO_URI'),
      database: 'shcd_db',
      entities: [User, Bank, Subscription, Expense, Goal],
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', false),
    };
    return options;
  }
}
