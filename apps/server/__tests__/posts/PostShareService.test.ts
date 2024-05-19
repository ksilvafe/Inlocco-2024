import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostShareService } from "../../src/api/services/posts/PostShareService";

let postsRepository: InMemoryPostsRepository;
let postCreationService: PostCreationService;
let tripsRepository: InMemoryTripsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let postShareService: PostShareService;

describe("Services :: Posts :: Post Share", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    tripsRepository = new InMemoryTripsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    postShareService = new PostShareService(postsRepository);
  });

  it("should be able to share a post", async () => {
    const post = { cuid: "1", photos: [], videos: [], location: [] };

    const postCreated = await postCreationService.execute(post);
    const postShared = await postShareService.execute({
      cuid: postCreated.cuid,
    });

    expect(postShared).toHaveProperty("shares");
    expect(postShared.shares.increment).toBe(1);
  });
});
