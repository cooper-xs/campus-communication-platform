import { Context } from "koa";
import { PostsRepository } from "../config/data-source";
import { newPost } from "../types";

export default class PostsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addPost(newPost: newPost) {
    const post = await PostsRepository.save(newPost);
    return post;
  }

  public async reviewPost(postId: number, pinnedState: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      post.pinnedState = pinnedState;
      await PostsRepository.save(post);
      return post;
    }
  }

  public async getPostsAsPage(page: number, pageSize: number) {
    const posts = await PostsRepository.find({
      where: { pinnedState: 1 },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return posts;
  }
}
