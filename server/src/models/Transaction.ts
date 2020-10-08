import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Category from './Category';
import User from './User';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  type: 'income' | 'outcome';

  @Column('float')
  value: number;

  @Column('uuid')
  category_id: string;

  @ManyToOne(() => Category, category => category.transaction, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user.transactions, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
