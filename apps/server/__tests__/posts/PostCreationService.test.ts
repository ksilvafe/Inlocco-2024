import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";

let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let postCreationService: PostCreationService;
let openstreetmapRepository: InMemoryopenstreetmapRepository;

describe("Services :: Posts :: Post Creation", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    tripsRepository = new InMemoryTripsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
  });

  it("should be able to create a new post", async () => {
    const post = { cuid: "1", photos: [], videos: [], location: [] };

    const postCreated = await postCreationService.execute(post);
    expect(postCreated).toHaveProperty("cuid");
  });
});
