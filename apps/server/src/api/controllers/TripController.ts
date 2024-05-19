import { Request, Response } from "express";

import { NotificationsRepository } from "../repositories/notifications/NotificationsRepository";
import { PostsRepository } from "../repositories/posts/PostsRepository";
import { TripsRepository } from "../repositories/trips/TripsRepository";
import { UsersRepository } from "../repositories/users/UsersRepository";
import { TripCreationService } from "../services/trips/TripCreationService";
import { TripLikeService } from "../services/trips/TripLikeService";
import { TripListService } from "../services/trips/TripListService";
import { TripSaveService } from "../services/trips/TripSaveService";
import { TripShareService } from "../services/trips/TripShareService";
import { TripShowService } from "../services/trips/TripShowService";
import { TripUpdateService } from "../services/trips/TripUpdateService";
import { TripView } from "../views/TripView";

export class TripController {
  async store(request: Request, response: Response) {
    const { title, description, posts } = request.body;

    const { cuid } = request.user;

    const tripsRepository = new TripsRepository();
    const createTrip = new TripCreationService(tripsRepository);

    const data = {
      title,
      description,
      userCuid: cuid,
      posts,
    };

    await createTrip.execute(data);

    return response.status(201).send();
  }

  async show(request: Request, response: Response) {
    const { cuid } = request.params;

    const tripsRepository = new TripsRepository();
    const showTrip = new TripShowService(tripsRepository);

    const trip = await showTrip.execute({ cuid });
    const tripsView = TripView.render(trip);

    return response.json(tripsView);
  }

  async index(request: Request, response: Response) {
    const tripsRepository = new TripsRepository();
    const listTrip = new TripListService(tripsRepository);

    const trips = await listTrip.execute(request.query);
    const tripsView = TripView.renderMany(trips);

    return response.json(tripsView);
  }

  async update(request: Request, response: Response) {
    const { cuid } = request.params;
    const { name, description, travelers, purpose, startDate, endDate, posts } =
      request.body;

    const { cuid: userCuid } = request.user;

    const tripsRepository = new TripsRepository();
    const usersRepository = new UsersRepository();
    const postsRepository = new PostsRepository();
    const updateTrip = new TripUpdateService(
      tripsRepository,
      usersRepository,
      postsRepository
    );

    const data = {
      name,
      description,
      travelers: [userCuid, ...travelers],
      purpose,
      startDate,
      endDate,
      posts,
      cuid,
    };

    await updateTrip.execute(data);

    return response.status(200).send();
  }

  async save(request: Request, response: Response) {
    const { cuid: tripCuid } = request.params;
    const { cuid: userCuid } = request.user;

    const tripsRepository = new TripsRepository();
    const usersRepository = new UsersRepository();
    const notificationsRepository = new NotificationsRepository();
    const saveTrip = new TripSaveService(
      tripsRepository,
      usersRepository,
      notificationsRepository
    );

    await saveTrip.execute({ tripCuid, userCuid });

    return response.status(201).send();
  }

  async like(request: Request, response: Response) {
    const { cuid: tripCuid } = request.params;
    const { cuid: userCuid } = request.user;

    const tripsRepository = new TripsRepository();
    const usersRepository = new UsersRepository();
    const notificationsRepository = new NotificationsRepository();
    const likeTrip = new TripLikeService(
      tripsRepository,
      usersRepository,
      notificationsRepository
    );

    await likeTrip.execute({ tripCuid, userCuid });

    return response.status(201).send();
  }

  async share(request: Request, response: Response) {
    const { cuid } = request.params;

    const tripsRepository = new TripsRepository();
    const shareTrip = new TripShareService(tripsRepository);

    await shareTrip.execute({ cuid });

    return response.status(201).send();
  }
}
