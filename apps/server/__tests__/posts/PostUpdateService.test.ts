import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostUpdateService } from "../../src/api/services/posts/PostUpdateService";

let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let postUpdateService: PostUpdateService;
let postCreationService: PostCreationService;

describe("Services :: Posts :: Post Update", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    tripsRepository = new InMemoryTripsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    postUpdateService = new PostUpdateService(postsRepository, tripsRepository);
  });

  it("should be able to update a post", async () => {
    const post = { photos: [], videos: [], location: [] };
    const postCreated = await postCreationService.execute(post);
    const updatePost = {
      cuid: postCreated.cuid,
      photos: [],
      videos: [],
      location: [],
      title: "title",
    };
    const postUpdated = await postUpdateService.execute(updatePost);
    expect(postCreated.title).toBeUndefined();
    expect(postUpdated).toHaveProperty("title");
  });
});
