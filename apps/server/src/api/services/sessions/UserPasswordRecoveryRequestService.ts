import bcrypt from "bcrypt";
import crypto from "crypto";

import { IUsers } from "../../../@types/models";
import env from "../../../config/env";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
}

export class UserPasswordRecoveryRequestService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, env.salt);

    await this.usersRepository.update(user.cuid, {
      resetToken: hash,
    });
    const recoveryLink = `${env.baseUrl}/login/redefinir-senha/?token=${resetToken}&id=${user.cuid}`;

    return {
      cuid: user.cuid,
      email: email,
      resetToken,
      recoveryLink,
    };
  }
}
