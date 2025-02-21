import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('goals')
export class Goal {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  is_complete: boolean;

  @Column('decimal')
  expected_value: number;

  @Column('decimal')
  initial_value: number;

  @Column('decimal')
  progress: number;

  @Column('decimal')
  applied: number;

  @Column('decimal')
  balance: number;

  @Column()
  transfers: {
    value: number;
    at: Date;
  }[];

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
