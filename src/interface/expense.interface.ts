import type { CreateExpenseDto } from 'src/dto/expense.dto';
import type { Expense } from 'src/entities/expense.entity';

export interface ExpenseInterface {
  create(req: CreateExpenseDto): Promise<Expense>;
  update(id: string, req: CreateExpenseDto): Promise<Expense>;
  findById(id: string): Promise<Expense>;
  findAll(): Promise<Expense[]>;
  delete(id: string): Promise<void>;
}
