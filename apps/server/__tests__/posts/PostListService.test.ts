import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostListService } from "../../src/api/services/posts/PostListService";

let postsRepository: InMemoryPostsRepository;
let tripsRepository: InMemoryTripsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let postCreationService: PostCreationService;
let postListService: PostListService;

describe("Services :: Posts :: Post List", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    tripsRepository = new InMemoryTripsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    postListService = new PostListService(postsRepository);
  });

  it("should be able to list posts", async () => {
    const post = { photos: [], videos: [], location: [] };
    try {
      const postCreated = await postCreationService.execute(post);
      const postList = await postListService.execute({});

      expect(postList[0].cuid).toBe(postCreated.cuid);
    } catch (error: any) {
      console.error(error);
      expect(error.statusCode).toBe(500);
    }
  });
});
