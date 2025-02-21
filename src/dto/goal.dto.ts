export class CreateGoalDto {
  name: string;
  is_complete: boolean;
  expected_value: number;
  initial_value: number;
  progress: number;
  applied: number;
  balance: number;
  transfers: {
    value: number;
    at: Date;
  }[];
  userId: string;
}
