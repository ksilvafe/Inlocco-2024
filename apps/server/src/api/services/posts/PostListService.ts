import { IPosts } from "../../../@types/models";
import { IPostsRepository } from "../../repositories/posts/IPostsRepository";

interface IRequest {
  postCuids?: string[];
}

export class PostListService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ postCuids }: IRequest): Promise<IPosts[]> {
    const posts = await this.postsRepository.findMany(postCuids);

    return posts;
  }
}
