import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  is_active: boolean;

  @Column('decimal')
  total_amount: number;

  @Column('decimal')
  month_amount: number;

  @Column()
  charge_type: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
