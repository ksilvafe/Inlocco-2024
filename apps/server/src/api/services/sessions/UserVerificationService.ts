import { UserStatus } from "@prisma/client";

import { IUsers } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  confirmationCode: string;
}

export class UserVerificationService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ confirmationCode }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByConfirmationCode(
      confirmationCode
    );

    if (!user) {
      throw new UserNotFoundError();
    }
    const data = { status: UserStatus.ACTIVE };
    const userUpdated = await this.usersRepository.update(user.cuid, data);
    return userUpdated;
  }
}
