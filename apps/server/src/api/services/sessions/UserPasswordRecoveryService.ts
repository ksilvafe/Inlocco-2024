import { hash, compare } from "bcrypt";

import { IUsers } from "../../../@types/models";
import env from "../../../config/env";
import { InvalidTokenError } from "../../../shared/errors/InvalidTokenError";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
  token: string;
  password: string;
}

export class UserPasswordRecoveryService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid, token, password }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByCuid(cuid);

    if (!user) {
      throw new UserNotFoundError();
    }
    if (!user.resetToken) {
      throw new InvalidTokenError();
    }
    const tokenIsValid = await compare(token, user.resetToken);

    if (!tokenIsValid) {
      throw new InvalidTokenError();
    }

    const passwordHash = await hash(password, env.salt);
    const data = { password: passwordHash, resetToken: "" };

    const userUpdated = await this.usersRepository.update(user.cuid, data);
    return userUpdated;
  }
}
