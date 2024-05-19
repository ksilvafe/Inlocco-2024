import { faker } from "@faker-js/faker";

import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { TripCreationService } from "../../src/api/services/trips/TripCreationService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { EndDateIsEarlierStartDateError } from "../../src/shared/errors/EndDateIsEarlierStartDateError";
import { SomeTravelerNotFoundError } from "../../src/shared/errors/SomeTravelerNotFoundError";

let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let usersRepository: InMemoryUsersRepository;
let tripCreationService: TripCreationService;
let userCreationService: UserCreationService;

describe("Services :: Trips :: Trip Creation", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    tripsRepository = new InMemoryTripsRepository();
    postsRepository = new InMemoryPostsRepository();
    tripCreationService = new TripCreationService(
      tripsRepository,
      usersRepository,
      postsRepository
    );
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to create a new trip", async () => {
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
    const tripCreated = await tripCreationService.execute(trip);
    expect(tripCreated).toHaveProperty("cuid");
  });

  it("should not be able to create a new trip with non-existing traveler", async () => {
    const trip = {
      name: faker.lorem.words(),
      description: faker.lorem.sentences(),
      travelers: ["cuid"],
      purpose: [faker.lorem.word()],
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
      posts: [],
    };
    try {
      await tripCreationService.execute(trip);
    } catch (error: any) {
      expect(error).toBeInstanceOf(SomeTravelerNotFoundError);
      expect(error.message).toBe("Algum viajante não foi encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });

  it("should not be able to create a new trip with end date before start date", async () => {
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
      startDate: faker.date.future().toISOString(),
      endDate: faker.date.past().toISOString(),
      posts: [],
    };
    try {
      await tripCreationService.execute(trip);
    } catch (error: any) {
      expect(error).toBeInstanceOf(EndDateIsEarlierStartDateError);
      expect(error.message).toBe("Data final é anterior a Data inicial");
      expect(error.statusCode).toBe(400);
    }
  });
});
