import { faker } from "@faker-js/faker";

import { InMemoryCommentsRepository } from "../../src/api/repositories/comments/in-memory/InMemoryCommentsRepository";
import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { InMemoryUsersRepository } from "../../src/api/repositories/users/in-memory/InMemoryUsersRepository";
import { CommentCreationService } from "../../src/api/services/comments/CommentCreationService";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { UserCreationService } from "../../src/api/services/users/UserCreationService";

let commentsRepository: InMemoryCommentsRepository;
let usersRepository: InMemoryUsersRepository;
let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let commentCreationService: CommentCreationService;
let postCreationService: PostCreationService;
let userCreationService: UserCreationService;

describe("Services :: Comments :: Comment Creation", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    commentsRepository = new InMemoryCommentsRepository();
    postsRepository = new InMemoryPostsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    tripsRepository = new InMemoryTripsRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    userCreationService = new UserCreationService(usersRepository);
    commentCreationService = new CommentCreationService(
      commentsRepository,
      usersRepository,
      postsRepository
    );
  });

  it("should be able to create a new comment", async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userCreated = await userCreationService.execute(user);

    const post = { cuid: "1", photos: [], videos: [], location: [] };
    const postCreated = await postCreationService.execute(post);

    const comment = {
      text: "lorem ipsum",
      userCuid: userCreated.cuid,
      postCuid: postCreated.cuid,
    };

    const commentCreated = await commentCreationService.execute(comment);
    expect(commentCreated).toHaveProperty("cuid");
  });
});
