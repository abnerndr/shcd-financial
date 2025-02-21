import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  month_expenses: string;

  @Column('decimal')
  amount: number;

  @Column()
  is_paid: boolean;

  @Column()
  bankId: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
