import { Prisma } from "@prisma/client";

import { IUsers } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
  data: Prisma.UsersUncheckedUpdateInput;
}

export class UserUpdateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid, data }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByCuid(cuid);

    if (!user) {
      throw new UserNotFoundError();
    }
    const updateUser = await this.usersRepository.update(user.cuid, data);

    return updateUser;
  }
}
