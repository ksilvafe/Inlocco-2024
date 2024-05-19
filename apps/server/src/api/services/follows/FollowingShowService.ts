import { IPosts } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
}

export class FollowingShowService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid }: IRequest): Promise<IPosts> {
    const userFollowers = await this.usersRepository.findByCuid(cuid, {
      followers: {
        include: {
          following: {
            include: {
              profile: true,
            },
          },
          follower: true,
        },
      },
    });

    if (!userFollowers) {
      throw new UserNotFoundError();
    }

    return userFollowers.followers;
  }
}
