import { faker } from "@faker-js/faker";

import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { TripCreationService } from "../../src/api/services/trips/TripCreationService";
import { TripShowService } from "../../src/api/services/trips/TripShowService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { TripNotFoundError } from "../../src/shared/errors/TripNotFoundError";

let tripsRepository: InMemoryTripsRepository;
let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let tripCreationService: TripCreationService;
let tripShowService: TripShowService;
let userCreationService: UserCreationService;

describe("Services :: Trips :: Trip Show", () => {
  beforeEach(() => {
    tripsRepository = new InMemoryTripsRepository();
    usersRepository = new InMemoryUsersRepository();
    postsRepository = new InMemoryPostsRepository();
    tripCreationService = new TripCreationService(
      tripsRepository,
      usersRepository,
      postsRepository
    );
    tripShowService = new TripShowService(tripsRepository);
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to show a  trip", async () => {
    const userCreated = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const trip = {
      name: faker.lorem.words(),
      description: faker.lorem.sentences(),
      travelers: [userCreated.cuid],
      purpose: [faker.lorem.word()],
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      posts: [],
    };
    try {
      const tripCreated = await tripCreationService.execute(trip);
      const tripShow = await tripShowService.execute({
        cuid: tripCreated.cuid,
      });

      expect(tripShow).toHaveProperty("cuid");
    } catch (error: any) {
      expect(error.statusCode).toBe(500);
    }
  });

  it("should return trip not found when cuid is invalid", async () => {
    try {
      await tripShowService.execute({ cuid: "invalid_cuid" });
    } catch (error: any) {
      expect(error).toBeInstanceOf(TripNotFoundError);
      expect(error.message).toBe("Viagem não encontrada!");
      expect(error.statusCode).toBe(404);
    }
  });
});
