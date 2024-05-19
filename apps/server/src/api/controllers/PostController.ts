import { Request, Response } from "express";

import { NotificationsRepository } from "../repositories/notifications/NotificationsRepository";
import { OpenstreetmapRepository } from "../repositories/openstreetmap/OpenstreetmapRepository";
import { PostsRepository } from "../repositories/posts/PostsRepository";
import { TripsRepository } from "../repositories/trips/TripsRepository";
import { UsersRepository } from "../repositories/users/UsersRepository";
import { PostCreationService } from "../services/posts/PostCreationService";
import { PostListService } from "../services/posts/PostListService";
import { PostSaveService } from "../services/posts/PostSaveService";
import { PostShowService } from "../services/posts/PostShowService";
import { PostUpdateService } from "../services/posts/PostUpdateService";
import { PostView } from "../views/PostView";

export class PostController {
  async store(request: Request, response: Response) {
    const {
      tripCuid,
      description,
      travelers = [],
      purpose,
      location,
    } = request.body;

    const photos = request.files.filter((file) => file.fieldname === "photos");
    //const videos = request.files?.videos;

    const { cuid: userCuid } = request.user;

    const postsRepository = new PostsRepository();
    const openstreetmapRepository = new OpenstreetmapRepository();
    const createPost = new PostCreationService(
      postsRepository,
      openstreetmapRepository
    );
    const data = {
      tripCuid,
      description,
      travelers: [...travelers, userCuid],
      purpose,
      location,
      photos: photos?.map((file) => file.key),
      videos: [], //videos?.map((file) => file.filename),
    };

    await createPost.execute(data);

    return response.status(201).send();
  }

  async show(request: Request, response: Response) {
    const { cuid } = request.params;

    const postsRepository = new PostsRepository();
    const showPost = new PostShowService(postsRepository);

    const post = await showPost.execute({ cuid });

    const postView = PostView.render(post);

    return response.json(postView);
  }

  async index(request: Request, response: Response) {
    const postsRepository = new PostsRepository();
    const listPost = new PostListService(postsRepository);

    const post = await listPost.execute({});

    const postView = PostView.renderMany(post);

    return response.json(postView);
  }

  async update(request: Request, response: Response) {
    const { cuid } = request.params;
    const {
      tripCuid,
      description,
      travelers = [],
      purpose,
      location,
    } = request.body;

    const photos =
      request.files &&
      request.files.filter((file) => file.fieldname === "photos");

    //const videos = request.files?.videos;

    const { cuid: userCuid } = request.user;

    const postsRepository = new PostsRepository();
    const updatePost = new PostUpdateService(postsRepository);

    const data = {
      cuid,
      tripCuid,
      description,
      travelers: [...travelers, userCuid],
      purpose,
      location,
      photos: photos?.map((file) => file.filename),
      videos: [], //videos?.map((file) => file.filename),
    };

    await updatePost.execute(data);

    return response.status(200).send();
  }

  async save(request: Request, response: Response) {
    const { cuid: postCuid } = request.params;
    const { cuid: userCuid } = request.user;

    const postsRepository = new PostsRepository();
    const usersRepository = new UsersRepository();
    const notificationsRepository = new NotificationsRepository();
    const savePost = new PostSaveService(
      postsRepository,
      usersRepository,
      notificationsRepository
    );

    await savePost.execute({ postCuid, userCuid });

    return response.status(201).send();
  }
}
