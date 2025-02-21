import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from 'src/dto/expense.dto';
import { Expense } from 'src/entities/expense.entity';
import { ExpenseInterface } from 'src/interface/expense.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ExpenseService implements ExpenseInterface {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: MongoRepository<Expense>,
  ) {}
  async create(req: CreateExpenseDto): Promise<Expense> {
    const createObject = this.expenseRepository.create({
      ...req,
    });
    return await this.expenseRepository.save(createObject);
  }
  async update(id: string, req: CreateExpenseDto): Promise<Expense> {
    if (!id) throw new BadRequestException('ID not found');
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) {
      throw new BadRequestException('Expense not found');
    }
    const updatedFields = Object.keys(req).reduce((acc, key) => {
      if (req[key] !== expense[key]) {
        acc[key] = req[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length > 0) {
      await this.expenseRepository.update(id, updatedFields);
    }
    return (await this.expenseRepository.findOneBy({
      id: expense.id,
    })) as Expense;
  }
  async findById(id: string): Promise<Expense> {
    if (!id) throw new BadRequestException('ID not found');
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) throw new BadRequestException('Expense not found');
    return expense;
  }
  async findAll(): Promise<Expense[]> {
    const expense = await this.expenseRepository.find();
    return expense;
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('ID not found');
    await this.expenseRepository.delete(id);
  }
}
