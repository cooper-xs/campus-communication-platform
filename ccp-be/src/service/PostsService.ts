import { Context } from "koa";
import { PostsRepository } from "../config/data-source";
import { updatePost } from "../types";

export default class PostsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async updatePost(updatePost: updatePost) {
    const post = await PostsRepository.save(updatePost);
    return post;
  }

  public async reviewPost(postId: number, state: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      post.state = state;
      await PostsRepository.save(post);
      return post;
    }
  }

  public async getPosts() {
    const posts = await PostsRepository.find({
      order: {
        creationTime: "DESC",
      },
    });
    return posts;
  }

  public async getPostByPostId(postId: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    return post;
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

  public async deletePost(postId: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      await PostsRepository.remove(post);
      return post;
    }
  }

  public async passPost(postId: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      post.state = 2;
      await PostsRepository.save(post);
      return post;
    }
  }

  public async rejectPost(postId: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      post.state = 3;
      await PostsRepository.save(post);
      return post;
    }
  }

  public async waittingReviewPost(postId: number) {
    const post = await PostsRepository.findOne({
      where: { postId },
    });
    if (post) {
      post.state = 1;
      await PostsRepository.save(post);
      return post;
    }
  }
}
