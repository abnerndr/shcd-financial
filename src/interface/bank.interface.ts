import type { CreateBankDto } from 'src/dto/bank.dto';
import { Bank } from 'src/entities/bank.entity';

export interface BankInterface {
  create(req: CreateBankDto): Promise<Bank>;
  update(id: string, req: CreateBankDto): Promise<Bank>;
  findById(id: string): Promise<Bank>;
  findAll(): Promise<Bank[]>;
  delete(id: string): Promise<void>;
}
