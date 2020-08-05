import { getRepository, getConnection } from "typeorm";
import { AccountModel, BillModel } from "@/infra/db/models";
import { mockAccount } from "@/domain/tests/mock-account";
import connection from "@/infra/db/config/database";
import { insertOneAccount } from "../../seeds";
import { TypeOrmBillsRepository } from "./typeorm-bills-repository";
import { mockBill } from "@/domain/tests";

type SutTypes = {
  sut: TypeOrmBillsRepository;
};

const makeSut = (): SutTypes => {
  const sut = new TypeOrmBillsRepository();
  return { sut };
};

const createAccount = async (): Promise<AccountModel> => {
  const accountRepository = getRepository(AccountModel);
  const account = mockAccount();
  return insertOneAccount(accountRepository, account);
};

describe("TypeOrmBillsRepository", () => {
  beforeAll(async () => {
    await connection.create();
    await getConnection().runMigrations();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await getConnection().undoLastMigration();
    await connection.close();
  });
  describe("add", () => {
    it("should add a new bill to an account", async () => {
      const { sut } = makeSut();
      const createdAccount = await createAccount();
      const bill = mockBill();
      bill.account = createdAccount;
      await sut.add(bill);
      const billRepository = getRepository(BillModel);
      expect(await billRepository.count()).toBe(1);
    });
  });
});
