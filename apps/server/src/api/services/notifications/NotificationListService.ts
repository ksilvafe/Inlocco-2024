import { INotifications } from "../../../@types/models";
import { UserNotFoundError } from "../../../shared/errors/UserNotFoundError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  cuid: string;
}

export class NotificationListService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ cuid }: IRequest): Promise<INotifications> {
    const user = await this.usersRepository.findByCuid(cuid, {
      recipientNotifications: {
        include: {
          sender: {
            include: {
              profile: true,
            },
          },
          trip: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }
    return user.recipientNotifications;
  }
}
