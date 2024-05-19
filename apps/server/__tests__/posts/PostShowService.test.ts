import { InMemoryopenstreetmapRepository } from "../../src/api/repositories/openstreetmap/in-memory/InMemoryopenstreetmapRepository";
import { InMemoryPostsRepository } from "../../src/api/repositories/posts/in-memory/InMemoryPostsRepository";
import { InMemoryTripsRepository } from "../../src/api/repositories/trips/in-memory/InMemoryTripsRepository";
import { PostCreationService } from "../../src/api/services/posts/PostCreationService";
import { PostShowService } from "../../src/api/services/posts/PostShowService";
import { PostNotFoundError } from "../../src/shared/errors/PostNotFoundError";

let postsRepository: InMemoryPostsRepository;
let postCreationService: PostCreationService;
let tripsRepository: InMemoryTripsRepository;
let openstreetmapRepository: InMemoryopenstreetmapRepository;
let postShowService: PostShowService;

describe("Services :: Posts :: Post Show", () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository();
    openstreetmapRepository = new InMemoryopenstreetmapRepository();
    tripsRepository = new InMemoryTripsRepository();
    postCreationService = new PostCreationService(
      postsRepository,
      tripsRepository,
      openstreetmapRepository
    );
    postShowService = new PostShowService(postsRepository);
  });

  it("should be able to show a  post", async () => {
    const post = { cuid: "1", photos: [], videos: [], location: [] };
    try {
      const postCreated = await postCreationService.execute(post);
      const postShow = await postShowService.execute({
        cuid: postCreated.cuid,
      });

      expect(postShow).toHaveProperty("cuid");
    } catch (error: any) {
      expect(error.statusCode).toBe(500);
    }
  });

  it("should return post not found when cuid is invalid", async () => {
    try {
      await postShowService.execute({ cuid: "invalid_cuid" });
    } catch (error: any) {
      expect(error).toBeInstanceOf(PostNotFoundError);
      expect(error.message).toBe("Post não encontrado!");
      expect(error.statusCode).toBe(404);
    }
  });
});
