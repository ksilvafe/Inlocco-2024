import { faker } from "@faker-js/faker";

import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { TripCreationService } from "../../src/api/services/trips/TripCreationService";
import { TripUpdateService } from "../../src/api/services/trips/TripUpdateService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";
import { PostDontBelongUserError } from "../../src/shared/errors/PostDontBelongUserError";

let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let usersRepository: InMemoryUsersRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let tripCreationService: TripCreationService;
let tripUpdateService: TripUpdateService;
let userCreationService: UserCreationService;
let postCreationService: PostCreationService;

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
    tripUpdateService = new TripUpdateService(
      tripsRepository,
      usersRepository,
      postsRepository
    );
    userCreationService = new UserCreationService(usersRepository);
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
  });

  it("should be able to update a trip", async () => {
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
    const tripUpdate = {
      ...trip,
      cuid: tripCreated.cuid,
      name: faker.lorem.words(),
    };
    const tripUpdated = await tripUpdateService.execute(tripUpdate);
    expect(tripUpdated.name).toBe(tripUpdate.name);
  });

  it("should not be able to update a trip with posts from other users", async () => {
    const userCreated = await userCreationService.execute({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const userCreated2 = await userCreationService.execute({
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

    const post = {
      photos: [],
      videos: [],
      location: [],
      userCuid: userCreated2.cuid,
    };
    const postCreated = await postCreationService.execute(post);

    try {
      const tripUpdate = {
        ...trip,
        cuid: tripCreated.cuid,
        posts: [postCreated.cuid],
      };
      await tripUpdateService.execute(tripUpdate);
    } catch (error: any) {
      expect(error).toBeInstanceOf(PostDontBelongUserError);
      expect(error.message).toBe("Post não pertence ao usuario!");
      expect(error.statusCode).toBe(400);
    }
  });
});
