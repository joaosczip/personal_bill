import { AddBillRepository } from "@/data/protocols";
import { Repository, getRepository } from "typeorm";
import { BillModel } from "../../models";

export class TypeOrmBillsRepository implements AddBillRepository {
  private repository: Repository<BillModel>;

  constructor() {
    this.repository = getRepository(BillModel);
  }

  async add(
    params: AddBillRepository.Params
  ): Promise<AddBillRepository.Model> {
    const bill = this.repository.create(params);
    const {
      updated_at,
      created_at,
      ...createdBill
    } = await this.repository.save(bill);
    return createdBill;
  }
}
