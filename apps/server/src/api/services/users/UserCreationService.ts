import { hash } from "bcrypt";

import { IUsers } from "../../../@types/models";
import env from "../../../config/env";
import { UserAlreadyExistsError } from "../../../shared/errors/UserAlreadyExistsError";
import { JwtManager } from "../../../shared/infra/jwtManager";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
  username: string;
}

export class UserCreationService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, email, password }: IRequest): Promise<IUsers> {
    const jwt = new JwtManager();
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }
    const passwordHash = await hash(password, env.salt);
    const confirmationCode = jwt.generate({ email });

    const user = await this.usersRepository.create({
      email,
      username,
      password: passwordHash,
      confirmationCode,
    });

    return user;
  }
}
