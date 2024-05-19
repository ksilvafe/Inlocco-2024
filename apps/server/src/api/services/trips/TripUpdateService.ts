import { ITrips } from "../../../@types/models";
import { EndDateIsEarlierStartDateError } from "../../../shared/errors/EndDateIsEarlierStartDateError";
import { PostDontBelongUserError } from "../../../shared/errors/PostDontBelongUserError";
import { SomeTravelerNotFoundError } from "../../../shared/errors/SomeTravelerNotFoundError";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";
import { ITripsRepository } from "../../repositories/trips/ITripsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { PostListService } from "../posts/PostListService";

interface IRequest {
  name?: string;
  description?: string;
  travelers: string[];
  purpose: string[];
  startDate?: string;
  endDate?: string;
  posts: string[];
  cuid: string;
}

export class TripUpdateService {
  constructor(
    private tripsRepository: ITripsRepository,
    private usersRepository: IUsersRepository,
    private postsRepository: IPostsRepository
  ) {}

  async execute({
    name,
    description,
    travelers,
    purpose,
    startDate,
    endDate,
    posts,
    cuid,
  }: IRequest): Promise<ITrips> {
    //todo os travelers devem existir
    const travelersUsers = await this.usersRepository.findManyByCuids(
      travelers
    );
    const someTravelerDoesntExist = travelers.length !== travelersUsers.length;

    if (someTravelerDoesntExist) {
      throw new SomeTravelerNotFoundError();
    }

    //startDate deve ser anterior a endDate
    if (startDate && endDate) {
      const diffDates =
        new Date(endDate).getTime() - new Date(startDate).getTime();
      const endDateIsEarlierStartDate = diffDates < 0;

      if (endDateIsEarlierStartDate) {
        throw new EndDateIsEarlierStartDateError();
      }
    }

    // postagem deve ser do usuario
    const postListService = new PostListService(this.postsRepository);
    const postsList = await postListService.execute({ postCuids: posts });
    const postsDontBelongUser = postsList.find(
      (post) => post.users[0].cuid !== travelers[0]
    );

    if (postsDontBelongUser) {
      throw new PostDontBelongUserError();
    }

    const data = {
      name,
      description,
      travelers,
      purpose,
      startDate,
      endDate,
      posts,
    };
    const trip = await this.tripsRepository.update(cuid, data);

    return trip;
  }
}
