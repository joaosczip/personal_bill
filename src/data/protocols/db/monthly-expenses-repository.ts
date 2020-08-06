import { AddExpenseInMonth } from "@/domain/usecases";
import { MonthlyExpense } from "@/domain/models";

export interface MonthlyExpensesRepository {
  add: (params: MonthlyExpensesRepository.Params) => Promise<void>;
  update: (params: MonthlyExpensesRepository.UpdateParams) => Promise<void>;
  loadByDate: (
    params: MonthlyExpensesRepository.Params
  ) => Promise<MonthlyExpensesRepository.Model[]>;
}

export namespace MonthlyExpensesRepository {
  export type Params = Pick<AddExpenseInMonth.Params, "account" | "date">;
  export type UpdateParams = Omit<MonthlyExpense, "account"> & {
    account: {
      id: string;
    };
  };
  export type Model = MonthlyExpense;
}
