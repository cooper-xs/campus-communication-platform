import { Context } from "koa";
import { PostReviewRepository } from "../config/data-source";

export default class PostReviewService {
  constructor (private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addPostReview(newRostReview: any) {
    const res = await PostReviewRepository.save(newRostReview);
    return res;
  }
}