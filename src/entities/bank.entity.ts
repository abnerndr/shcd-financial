import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('banks')
export class Bank {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column('decimal')
  expenses: number;

  @Column('decimal')
  earnings: number;

  @Column('decimal')
  total_expenses: number;

  @Column('decimal')
  total_transfer: number;

  @Column('decimal')
  total_earnings: number;

  @Column('decimal')
  total_withdrawn: number;

  @Column('decimal')
  initial_amount: number;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
