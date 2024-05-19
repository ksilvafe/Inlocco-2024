import { ITrips } from "../../../@types/models";
import { INotificationsRepository } from "../../repositories/notifications/INotificationsRepository";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { NotificationCreationService } from "../notifications/NotificationCreationService";
import { UserShowService } from "../users/UserShowService";
import { TripShowService } from "./TripShowService";
interface IRequest {
  tripCuid: string;
  userCuid: string;
}

export class TripLikeService {
  constructor(
    private tripsRepository: ITripsRepository,
    private usersRepository: IUsersRepository,
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ tripCuid, userCuid }: IRequest): Promise<ITrips> {
    const tripShowService = new TripShowService(this.tripsRepository);
    const trip = await tripShowService.execute({ cuid: tripCuid });

    const userShowService = new UserShowService(this.usersRepository);
    const user = await userShowService.execute({ cuid: userCuid });

    const notificationCreationService = new NotificationCreationService(
      this.notificationsRepository
    );

    // Verifique se o usuário já deu "like" no trip
    const userLikedTrip = trip.likes.find(
      (likedUser: { userCuid: string }) => likedUser.userCuid === user.cuid
    );

    let tripUpdated;
    if (userLikedTrip) {
      tripUpdated = await this.tripsRepository.update(tripCuid, {
        likes: {
          delete: {
            cuid: userLikedTrip.cuid,
          },
        },
      });
    } else {
      tripUpdated = await this.tripsRepository.update(tripCuid, {
        likes: {
          create: {
            user: {
              connect: {
                cuid: userCuid,
              },
            },
          },
        },
      });

      await notificationCreationService.execute({
        title: "Você tem uma nova curtida",
        message: "curtiu a sua viagem",
        senderCuid: userCuid,
        recipientCuid: tripUpdated.userCuid,
        tripCuid,
      });
    }

    return tripUpdated;
  }
}
