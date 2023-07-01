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

  public async getPosts() {
    const posts = await PostsRepository.find();
    return posts;
  }

  public async getPostsByUserTypeAndId(userType: string, userId: string) {
    const posts = await PostsRepository.find({
      where: { userType, userId },
    });
    return posts;
  }

  public async getPostsByUserType(userType: string) {
    const posts = await PostsRepository.find({
      where: { userType },
    });
    return posts;
  }
}
