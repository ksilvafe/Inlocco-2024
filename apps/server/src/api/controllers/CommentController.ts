import { Request, Response } from "express";

import { CommentsRepository } from "../repositories/comments/CommentsRepository";
import { NotificationsRepository } from "../repositories/notifications/NotificationsRepository";
import { TripsRepository } from "../repositories/trips/TripsRepository";
import { CommentCreationService } from "../services/comments/CommentCreationService";

export class CommentController {
  async store(request: Request, response: Response) {
    const { text } = request.body;
    const { cuid: tripCuid } = request.params;
    const { cuid: userCuid } = request.user;

    const commentsRepository = new CommentsRepository();
    const tripsRepository = new TripsRepository();
    const notificationsRepository = new NotificationsRepository();
    const createComment = new CommentCreationService(
      commentsRepository,
      tripsRepository,
      notificationsRepository
    );

    const data = {
      text,
      tripCuid,
      userCuid,
    };

    await createComment.execute(data);

    return response.status(201).send();
  }
}
