import { IPosts } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
}

export class FollowersShowService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid }: IRequest): Promise<IPosts> {
    const userFollowers = await this.usersRepository.findByCuid(cuid);

    if (!userFollowers) {
      throw new UserNotFoundError();
    }

    return userFollowers.following;
  }
}
