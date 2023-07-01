import { Context } from "koa";
import { CommentsRepository } from "../config/data-source";

export default class PostsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async getCommentsByPostId(postId: number) {
    const comments = await CommentsRepository.find({
      where: { postId },
    });
    return comments;
  }

  public async getCommentsAll() {
    const comments = await CommentsRepository.find();
    return comments;
  }

  public async addComment(newComment: any) {
    const comment = await CommentsRepository.save(newComment);
    return comment;
  }
}