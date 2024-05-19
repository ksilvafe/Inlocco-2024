import { Prisma } from "@prisma/client";

import { IPosts } from "../../../../@types/models";
import { IPostsRepository } from "../IPostsRepository";

export class InMemoryPostsRepository implements IPostsRepository {
  private posts: IPosts[] = [];

  async findByCuid(cuid: string): Promise<IPosts | null> {
    return this.posts.find((post) => post.cuid === cuid);
  }

  async create(data: IPosts): Promise<IPosts> {
    const post = {
      cuid: `${this.posts.length}`,
      likes: [],
      users: [{ cuid: data.users }],
    };
    Object.assign(data, post);
    this.posts.push(data);
    return post;
  }

  async update(cuid: string, data: IPosts): Promise<IPosts> {
    const updatePost = await this.findByCuid(cuid);

    const updatedPost = {
      ...updatePost,
      ...data,
    };
    this.posts[updatePost.cuid] = updatedPost;

    return updatedPost;
  }

  async findMany(cuids?: string[]): Promise<IPosts[]> {
    if (cuids) {
      return this.posts.filter((post) => cuids?.includes(post.cuid));
    }
    return this.posts;
  }
}
