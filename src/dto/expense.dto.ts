export class CreateExpenseDto {
  title: string;
  type: string;
  month_expenses: string;
  amount: number;
  is_paid: boolean;
  bankId: string;
  userId: string;
}
