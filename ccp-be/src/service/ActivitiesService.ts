import { Context } from "koa";
import { ActivitiesRepository } from "../config/data-source";

export default class ActivitiesService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async findActivityById(id: string) {
    const activity = await ActivitiesRepository.findOne({
      where: {
        id,
      },
    });
    return activity;
  }

  
}