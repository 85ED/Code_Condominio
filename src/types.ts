export interface House {
  id: number;
  name: string;
  nickname: string;
  currentResident: string;
  rent: number;
  dueDate: number;
  isPaid: boolean;
  moveInDate: string;
}

export interface Expense {
  id: number;
  accountGroup: string;
  expenseType: string;
  description: string;
  amount: number;
  date: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface Condominium {
  id: string;
  name: string;
  description: string;
  address: string;
  units: number;
}