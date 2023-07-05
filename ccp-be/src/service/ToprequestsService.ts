import { Context } from "koa";
import { TopRequestsRepository } from "../config/data-source";

export default class ToprequestsService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addTopRequests(postId: number, userId: string, userType: string, creationTime: Date, endTime: Date) {
    const topRequest = await TopRequestsRepository.create({
      postId,
      userId,
      userType,
      creationTime,
      endTime,
      state: 0,
    });
    await TopRequestsRepository.save(topRequest);
    return topRequest;
  }

  public async setTop(requestId: number, adminId: number, state: number, endTime: Date) {
    const topRequest = await TopRequestsRepository.findOne({
      where: {
        requestId,
      },
    });
    if (topRequest) {
      topRequest.adminId = adminId;
      topRequest.state = state;
      topRequest.endTime = endTime;
      await TopRequestsRepository.save(topRequest);
      return topRequest;
    }
    return;
  }

  public async getTopRequests() {
    const topRequests = await TopRequestsRepository.find();
    return topRequests;
  }
}
