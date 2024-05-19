import { IPosts } from "../../../@types/models";
import { INotificationsRepository } from "../../repositories/notifications/INotificationsRepository";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { NotificationCreationService } from "../notifications/NotificationCreationService";
import { UserShowService } from "../users/UserShowService";
import { PostShowService } from "./PostShowService";

interface IRequest {
  postCuid: string;
  userCuid: string;
}

export class PostSaveService {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ postCuid, userCuid }: IRequest): Promise<IPosts> {
    const postShowService = new PostShowService(this.postsRepository);
    const post = await postShowService.execute({ cuid: postCuid });

    const userShowService = new UserShowService(this.usersRepository);
    const user = await userShowService.execute({ cuid: userCuid });

    const notificationCreationService = new NotificationCreationService(
      this.notificationsRepository
    );

    // Verifique se o usuário já deu "like" no post
    const userSavedPost = post.saves.some(
      (likedUser: { cuid: string }) => likedUser.cuid === user.cuid
    );

    let postUpdated;

    if (userSavedPost) {
      postUpdated = await this.postsRepository.update(postCuid, {
        saves: { disconnect: { cuid: userCuid } },
      });
    } else {
      postUpdated = await this.postsRepository.update(postCuid, {
        saves: { connect: { cuid: userCuid } },
      });

      await notificationCreationService.execute({
        title: "Alguem adicionou a sua publicação aos favoritos",
        message: "adicionou a sua publicação aos favoritos",
        senderCuid: userCuid,
        recipientCuid: post.travelers[0].cuid,
      });
    }

    return postUpdated;
  }
}
