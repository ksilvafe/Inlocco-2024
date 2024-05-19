import { Request, Response } from "express";

import { UsersRepository } from "../repositories/users/UsersRepository";
import { UserCreationService } from "../services/users/UserCreationService";
import { UserListService } from "../services/users/UserListService";
import { UserShowService } from "../services/users/UserShowService";
import { UserShowTripsSavedService } from "../services/users/UserShowTripsSavedService";
import { UserUpdateService } from "../services/users/UserUpdateService";
import { TripView } from "../views/TripView";
import { UserView } from "../views/UserView";

export class UserController {
  async store(request: Request, response: Response) {
    const { username, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new UserCreationService(usersRepository);

    await createUser.execute({
      username,
      email,
      password,
    });

    return response.status(201).send();
  }

  async update(request: Request, response: Response) {
    const { cuid } = request.user;
    const filename = request.file?.key;

    const {
      username,
      email,
      name,
      biography,
      phone,
      gender,
      link,
      zipcode,
      country,
      state,
      city,
      neighborhood,
      street,
      number,
      complement,
    } = request.body;

    const usersRepository = new UsersRepository();
    const updateUser = new UserUpdateService(usersRepository);

    const data = {
      username,
      email,
      profile: {
        update: {
          name,
          biography,
          picture: filename && filename,
          phone,
          link,
          gender,
          address: {
            update: {
              zipcode,
              country,
              state,
              city,
              neighborhood,
              street,
              number,
              complement,
            },
          },
        },
      },
    };

    await updateUser.execute({ cuid, data });

    return response.status(204).send();
  }

  async index(request: Request, response: Response) {
    const usersRepository = new UsersRepository();
    const listUserProfile = new UserListService(usersRepository);

    const users = await listUserProfile.execute(request.query);

    const profileView = UserView.renderMany(users);

    return response.json(profileView);
  }

  async show(request: Request, response: Response) {
    const { cuid: paramsCuid }: { cuid?: string } = request.params;
    const { cuid: userCuid } = request.user;

    const usersRepository = new UsersRepository();
    const showUserProfile = new UserShowService(usersRepository);

    const user = await showUserProfile.execute({
      cuid: paramsCuid ?? userCuid,
    });

    const isFollowing = user.following.some(
      (following: { follower: { cuid: string } }) =>
        following.follower.cuid === userCuid
    );

    user.isFollowing = isFollowing;
    const profileView = UserView.render(user);

    return response.json(profileView);
  }

  async showTripsSaved(request: Request, response: Response) {
    const { cuid } = request.user;

    const usersRepository = new UsersRepository();
    const showUserProfile = new UserShowTripsSavedService(usersRepository);

    const user = await showUserProfile.execute({
      cuid,
    });

    const trips = user.tripSaves.map((tripSaves: any) => tripSaves.trip);

    const tripsView = TripView.renderMany(trips);
    return response.json(tripsView);
  }
}
