import { IUsers } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
}

export class UserShowService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByCuid(cuid, {
      profile: { include: { address: true } },
      likes: true,
      followers: true,
      following: {
        include: {
          follower: true,
        },
      },
      trips: {
        include: {
          posts: true,
        },
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
