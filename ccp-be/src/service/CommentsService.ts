import { Context } from "koa";
import { CommentsRepository } from "../config/data-source";

export default class PostsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async getCommentsByPostId(postId: number) {
    console.log(postId);
    const comments = await CommentsRepository.find({
      where: { postId },
    });
    return comments;
  }

  public async getCommentsAll() {
    const comments = await CommentsRepository.find();
    return comments;
  }
}