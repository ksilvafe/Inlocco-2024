import { IUsers } from "../../../@types/models";
import env from "../../../config/env";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
}

export class UserVerificationRequestService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const confirmationLink = `${env.baseUrl}/api/v1/auth/confirm/${user.confirmationCode}`;

    return {
      cuid: user.cuid,
      email: user.email,
      confirmationCode: user.confirmationCode,
      confirmationLink,
    };
  }
}
