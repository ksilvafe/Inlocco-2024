import { Prisma } from "@prisma/client";
import { ParsedQs } from "qs";

import { IUsers } from "../../../@types/models";
import { prisma } from "../../../config/database";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findByCuid(
    cuid: string,
    include?: Prisma.UsersInclude
  ): Promise<IUsers | null> {
    const user = await prisma.users.findUnique({
      where: {
        cuid: cuid,
      },
      include,
    });
    return user;
  }

  async findMany(
    query: ParsedQs,
    include?: Prisma.UsersInclude
  ): Promise<IUsers[]> {
    const users = await prisma.users.findMany({
      where: query,
      include,
    });
    return users;
  }

  async findManyByCuids(cuids: string[]): Promise<IUsers[]> {
    const users = await prisma.users.findMany({
      where: {
        cuid: {
          in: cuids,
        },
      },
    });
    return users;
  }

  async findByConfirmationCode(
    confirmationCode: string,
    include?: Prisma.UsersInclude
  ): Promise<IUsers | null> {
    const user = await prisma.users.findUnique({
      where: {
        confirmationCode,
      },
      include,
    });
    return user;
  }

  async create(data: IUsers): Promise<IUsers> {
    const user = await prisma.users.create({
      data: {
        ...data,
        profile: {
          create: {
            address: {
              create: {},
            },
          },
        },
      },
    });
    return user;
  }

  async update(
    cuid: string,
    data: Prisma.UsersUncheckedUpdateInput
  ): Promise<IUsers> {
    const updateUser = await prisma.users.update({
      where: {
        cuid,
      },
      data,
    });
    return updateUser;
  }
}
