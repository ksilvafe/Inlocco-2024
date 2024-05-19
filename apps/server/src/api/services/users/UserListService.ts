import { ParsedQs } from "qs";

import { IUsers } from "../../../@types/models";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
export class UserListService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(query: ParsedQs): Promise<IUsers> {
    const users = await this.usersRepository.findMany(query, {
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

    return users;
  }
}
