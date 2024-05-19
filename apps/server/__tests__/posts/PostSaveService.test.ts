import { faker } from "@faker-js/faker";

import { InMemoryNotificationsRepository } from "../../src/api/repositories/notifications/in-memory/InMemoryNotificationsRepository";
import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostSaveService } from "../../src/api/services/posts/PostSaveService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";

let postsRepository: InMemoryPostsRepository;
let postCreationService: PostCreationService;
let postSaveService: PostSaveService;
let tripsRepository: InMemoryTripsRepository;
let usersRepository: InMemoryUsersRepository;
let notificationsRepository: InMemoryNotificationsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let userCreationService: UserCreationService;

describe("Services :: Posts :: Post Save", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    tripsRepository = new InMemoryTripsRepository();
    usersRepository = new InMemoryUsersRepository();
    notificationsRepository = new InMemoryNotificationsRepository(
      usersRepository
    );
    openstreetmapRepository = new InMemoryopenstreetmapRepository();

    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    postSaveService = new PostSaveService(
      postsRepository,
      usersRepository,
      notificationsRepository
    );
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to save a post", async () => {
    const post = { cuid: "1", photos: [], videos: [], location: [] };

    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await userCreationService.execute(user);

    const postCreated = await postCreationService.execute(post);
    const postSaved = await postSaveService.execute({
      postCuid: postCreated.cuid,
      userCuid: userCreated.cuid,
    });

    expect(postSaved).toHaveProperty("saves");
  });
});
