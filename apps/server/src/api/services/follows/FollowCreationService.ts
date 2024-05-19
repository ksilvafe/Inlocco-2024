import { IFollows } from "../../../@types/models";
import { AlreadyFollowingError } from "../../../shared/errors/AlreadyFollowingError";
import { SelfFollowError } from "../../../shared/errors/SelfFollowError";
import { IFollowsRepository } from "../../repositories/follows/IFollowsRepository";
import { INotificationsRepository } from "../../repositories/notifications/INotificationsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { NotificationCreationService } from "../notifications/NotificationCreationService";
import { UserShowService } from "../users/UserShowService";
interface IRequest {
  followerCuid: string;
  followingCuid: string;
}

export class FollowCreationService {
  constructor(
    private followsRepository: IFollowsRepository,
    private usersRepository: IUsersRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ followerCuid, followingCuid }: IRequest): Promise<IFollows> {
    const showUserProfile = new UserShowService(this.usersRepository);

    if (followerCuid === followingCuid) {
      throw new SelfFollowError();
    }

    const userFollower = await showUserProfile.execute({ cuid: followerCuid });
    const userFollowing = await showUserProfile.execute({
      cuid: followingCuid,
    });

    const isAlreadyFollowing = await this.followsRepository.findByFollowers(
      userFollower,
      userFollowing
    );

    if (isAlreadyFollowing) {
      throw new AlreadyFollowingError();
    }

    const follow = await this.followsRepository.create({
      follower: userFollower,
      following: userFollowing,
    });

    const notificationCreationService = new NotificationCreationService(
      this.notificationsRepository
    );

    const notificationData = {
      title: "Você tem um novo seguidor",
      message: `começou a seguir você.`,
      senderCuid: userFollower.cuid,
      recipientCuid: userFollowing.cuid,
    };
    await notificationCreationService.execute(notificationData);
    return follow;
  }
}
