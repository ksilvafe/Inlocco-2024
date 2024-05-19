import { IUsers } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
}

export class UserShowTripsSavedService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid }: IRequest): Promise<IUsers> {
    const user = await this.usersRepository.findByCuid(cuid, {
      tripSaves: {
        include: {
          trip: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      },
    });
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
