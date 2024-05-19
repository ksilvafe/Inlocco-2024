import { Prisma, UserStatus } from "@prisma/client";
import { ParsedQs } from "qs";

import { IUsers } from "../../../../@types/models";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: IUsers[] = [];

  async findByEmail(email: string): Promise<IUsers | null> {
    return this.users.find((user) => user.email === email);
  }

  async findByCuid(cuid: string): Promise<IUsers | null> {
    return this.users.find((user) => user.cuid === cuid);
  }

  async findMany(
    query: ParsedQs,
    include?: Prisma.UsersInclude
  ): Promise<IUsers[]> {
    return this.users;
  }

  async findManyByCuids(cuids: string[]): Promise<IUsers[]> {
    return this.users.filter((user) => cuids.includes(user.cuid));
  }

  async findByConfirmationCode(
    confirmationCode: string
  ): Promise<IUsers | null> {
    return this.users.find(
      (user) => user.confirmationCode === confirmationCode
    );
  }

  async create(data: IUsers): Promise<IUsers> {
    const user = {
      cuid: `${this.users.length}`,
      confirmationCode: this.users.length,
      status: UserStatus.PENDING,
      followers: [],
      following: [],
      recipientNotifications: [],
    };
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }

  async update(
    cuid: string,
    data: Prisma.UsersUncheckedUpdateInput
  ): Promise<IUsers> {
    const updateUser = await this.findByCuid(cuid);

    const updatedUser = {
      ...updateUser,
      ...data,
    };
    this.users[updateUser.cuid] = updatedUser;

    return updatedUser;
  }
}
