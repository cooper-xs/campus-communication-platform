import { Context } from "koa";
import { ReplyRepository } from "../config/data-source";

export default class ReplyService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }


  public async getReplysByCommentId(commentId: number) {
    const replys = await ReplyRepository.find({
      where: { commentId },
    });
    return replys;
  }

  public async getReplysAll() {
    const replys = await ReplyRepository.find();
    return replys;
  }

  public async addReply(newReply: any) {
    const reply = await ReplyRepository.save(newReply);
    return reply;
  }
}