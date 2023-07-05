import { Context } from "koa";
import { PostReviewRepository } from "../config/data-source";

export default class PostReviewService {
  constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addPostReview(postId: number, adminId: string, status: number, creationTime: Date) {
    const res = await PostReviewRepository.save({
      postId,
      adminId,
      status,
      creationTime,
    });
    return res;
  }

  public async getPostReviews() {
    const res = await PostReviewRepository.find();
    return res;
  }
}
