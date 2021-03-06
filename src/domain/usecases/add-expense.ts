import { Expense } from "../models/expense";

export interface AddExpense {
  add: (params: AddExpense.Params) => Promise<AddExpense.Model>;
}

export namespace AddExpense {
  export type Params = Omit<Expense, "id" | "account"> & {
    account: {
      id: string;
    };
  };
  export type Model = Expense;
}
