import { compare } from "bcrypt";

import { IAuthenticateUserResponse } from "../../../@types/models";
import { IncorrectEmailOrPasswordError } from "../../../shared/errors/IncorrectEmailOrPasswordError";
import { JwtManager } from "../../../shared/infra/jwtManager";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

export class UserAuthenticationService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponse> {
    const jwt = new JwtManager();
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const token = jwt.generate({ cuid: user.cuid });

    return {
      user: {
        cuid: user.cuid,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
