import { IPosts } from "../../../@types/models";
import { PostNotFoundError } from "../../../shared/errors/PostNotFoundError";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

interface IRequest {
  cuid: string;
}

export class PostShowService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ cuid }: IRequest): Promise<IPosts> {
    const post = await this.postsRepository.findByCuid(cuid, {
      saves: true,
      trip: true,
      location: true,
      travelers: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    });

    if (!post) {
      throw new PostNotFoundError();
    }

    return post;
  }
}
