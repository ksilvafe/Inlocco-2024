import { Prisma } from "@prisma/client";
import { ParsedQs } from "qs";

import { IUsers } from "../../../@types/models";

export interface IUsersRepository {
  create: (data: IUsers) => Promise<IUsers>;
  update: (
    cuid: string,
    data: Prisma.UsersUncheckedUpdateInput
  ) => Promise<IUsers>;
  findByEmail: (
    email: string,
    include?: Prisma.UsersInclude
  ) => Promise<IUsers | null>;
  findByCuid: (
    cuid: string,
    include?: Prisma.UsersInclude
  ) => Promise<IUsers | null>;
  findMany: (
    query: ParsedQs,
    include?: Prisma.UsersInclude
  ) => Promise<IUsers[]>;
  findManyByCuids: (cuids: string[]) => Promise<IUsers[]>;
  findByConfirmationCode: (
    confirmationCode: string,
    include?: Prisma.UsersInclude
  ) => Promise<IUsers | null>;
}
