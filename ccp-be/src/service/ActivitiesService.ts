import { Context } from "koa";
import { ActivitiesRepository } from "../config/data-source";

export default class ActivitiesService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addActivity(activity: any) {
    const newActivity = await ActivitiesRepository.save(activity);
    return newActivity;
  }

  public async findActivityById(activityId: string) {
    const activity = await ActivitiesRepository.findOne({
      where: {
        activityId,
      },
    });
    return activity;
  }

  public async getActivities() {
    const activities = await ActivitiesRepository.find();
    return activities;
  }

  public async getActivitiesByTeacherId(teacherId: string) {
    const activities = await ActivitiesRepository.find({
      where: {
        teacherId,
      },
    });
    return activities;
  }
}