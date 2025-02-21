import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBankDto } from 'src/dto/bank.dto';
import { Bank } from 'src/entities/bank.entity';
import { BankInterface } from 'src/interface/bank.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class BankService implements BankInterface {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: MongoRepository<Bank>,
  ) {}
  async create(req: CreateBankDto): Promise<Bank> {
    const createObject = this.bankRepository.create({
      ...req,
    });
    return await this.bankRepository.save(createObject);
  }
  async update(id: string, req: CreateBankDto): Promise<Bank> {
    if (!id) throw new BadRequestException('ID not found');
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) {
      throw new BadRequestException('Bank not found');
    }
    const updatedFields = Object.keys(req).reduce((acc, key) => {
      if (req[key] !== bank[key]) {
        acc[key] = req[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length > 0) {
      await this.bankRepository.update(id, updatedFields);
    }
    return (await this.bankRepository.findOneBy({ id: bank.id })) as Bank;
  }
  async findById(id: string): Promise<Bank> {
    if (!id) throw new BadRequestException('ID not found');
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) throw new BadRequestException('Bank not found');
    return bank;
  }
  async findAll(): Promise<Bank[]> {
    const banks = await this.bankRepository.find();
    return banks;
  }
  async delete(id: string): Promise<void> {
    if (!id) throw new BadRequestException('ID not found');
    await this.bankRepository.delete(id);
  }
}
