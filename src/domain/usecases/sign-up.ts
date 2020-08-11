import { Account } from "@/domain/models";

export interface SignUp {
  signup: (params: SignUp.Params) => Promise<SignUp.Model>;
}

export namespace SignUp {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
  export type Model = Account;
}
