import { faker } from "@faker-js/faker";

import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { TripCreationService } from "../../src/api/services/trips/TripCreationService";
import { TripListService } from "../../src/api/services/trips/TripListService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";

let tripsRepository: InMemoryTripsRepository;
let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let tripCreationService: TripCreationService;
let tripListService: TripListService;
let userCreationService: UserCreationService;

describe("Services :: Trips :: Trip List", () => {
  beforeEach(() => {
    tripsRepository = new InMemoryTripsRepository();
    usersRepository = new InMemoryUsersRepository();
    postsRepository = new InMemoryPostsRepository();
    tripCreationService = new TripCreationService(
      tripsRepository,
      usersRepository,
      postsRepository
    );
    tripListService = new TripListService(tripsRepository);
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to list trips", async () => {
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
      const tripList = await tripListService.execute();

      expect(tripList[0]).toBe(tripCreated);
    } catch (error: any) {
      expect(error.statusCode).toBe(500);
    }
  });
});
