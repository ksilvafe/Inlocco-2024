import { IComments } from "../../../@types/models";
import { ICommentsRepository } from "../../repositories/comments/ICommentsRepository";
import { INotificationsRepository } from "../../repositories/notifications/INotificationsRepository";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";
import { NotificationCreationService } from "../notifications/NotificationCreationService";
import { TripShowService } from "../trips/TripShowService";

interface IRequest {
  text: string;
  userCuid: string;
  tripCuid: string;
}

export class CommentCreationService {
  constructor(
    private commentsRepository: ICommentsRepository,
    private tripsRepository: ITripsRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ text, userCuid, tripCuid }: IRequest): Promise<IComments> {
    const tripShowService = new TripShowService(this.tripsRepository);
    const trip = await tripShowService.execute({ cuid: tripCuid });

    const notificationCreationService = new NotificationCreationService(
      this.notificationsRepository
    );

    const comment = await this.commentsRepository.create({
      text,
      user: { connect: { cuid: userCuid } },
      trip: { connect: { cuid: tripCuid } },
    });

    await notificationCreationService.execute({
      title: "Você tem um novo comentario",
      message: "comentou a sua viagem",
      senderCuid: userCuid,
      recipientCuid: trip.userCuid,
      tripCuid,
    });

    return comment;
  }
}
