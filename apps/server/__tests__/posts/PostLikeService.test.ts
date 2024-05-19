import { faker } from "@faker-js/faker";

import { InMemoryNotificationsRepository } from "../../src/api/repositories/notifications/in-memory/InMemoryNotificationsRepository";
import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostLikeService } from "../../src/api/services/posts/PostLikeService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";

let postsRepository: InMemoryPostsRepository;
let usersRepository: InMemoryUsersRepository;
let tripsRepository: InMemoryTripsRepository;
let notificationsRepository: InMemoryNotificationsRepository;
let userCreationService: UserCreationService;
let postCreationService: PostCreationService;
let postLikeService: PostLikeService;
let openstreetmapRepository: InMemoryopenstreetmapRepository;

describe("Services :: Posts :: Post Like", () => {
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
    postLikeService = new PostLikeService(
      postsRepository,
      usersRepository,
      notificationsRepository
    );
    userCreationService = new UserCreationService(usersRepository);
  });

  it("should be able to like a post", async () => {
    const post = { photos: [], videos: [], location: [] };
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const userCreated = await userCreationService.execute(user);
    const postCreated = await postCreationService.execute(post);

    const postLiked = await postLikeService.execute({
      postCuid: postCreated.cuid,
      userCuid: userCreated.cuid,
    });

    expect(postLiked).toHaveProperty("likes");
    expect(postLiked.likes.connect.cuid).toBe(userCreated.cuid);
  });
});
