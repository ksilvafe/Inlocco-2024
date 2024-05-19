import { Request, Response } from "express";

import { FollowsRepository } from "../repositories/follows/FollowsRepository";
import { NotificationsRepository } from "../repositories/notifications/NotificationsRepository";
import { UsersRepository } from "../repositories/users/UsersRepository";
import { FollowCreationService } from "../services/follows/FollowCreationService";
import { FollowersShowService } from "../services/follows/FollowersShowService";
import { FollowingShowService } from "../services/follows/FollowingShowService";
import { FollowView } from "../views/FollowView";

export class FollowController {
  async store(request: Request, response: Response) {
    const { following } = request.body;

    const { cuid } = request.user;

    const followsRepository = new FollowsRepository();
    const usersRepository = new UsersRepository();
    const notificationsRepository = new NotificationsRepository();
    const createFollow = new FollowCreationService(
      followsRepository,
      usersRepository,
      notificationsRepository
    );

    const data = {
      followerCuid: cuid,
      followingCuid: following,
    };

    await createFollow.execute(data);

    return response.status(201).send();
  }

  async followers(request: Request, response: Response) {
    const { cuid } = request.params;

    const usersRepository = new UsersRepository();
    const followersShowService = new FollowersShowService(usersRepository);

    const followers = await followersShowService.execute({ cuid });

    return response.json(followers);
  }

  async following(request: Request, response: Response) {
    const { cuid } = request.params;

    const usersRepository = new UsersRepository();
    const followingShowService = new FollowingShowService(usersRepository);

    const following = await followingShowService.execute({ cuid });

    const followView = FollowView.renderMany(following);

    return response.json(followView);
  }
}
