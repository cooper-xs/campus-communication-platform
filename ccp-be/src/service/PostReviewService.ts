import { Context } from "koa";
import { PostReviewRepository } from "../config/data-source";

export default class PostReviewService {
  constructor (private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addPostReview(newRostReview: any) {
    const {
      postId,
      adminId,
      status,
      creationTime,
    } = newRostReview;
    console.log(newRostReview);
    const res = await PostReviewRepository.save({
      postId,
      adminId,
      status,
      creationTime,
    });
    return res;
  }
}