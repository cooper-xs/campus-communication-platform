import { Context } from "koa";
import ActivitiesService from "../service/ActivitiesService";
import { client, put } from "../utils/uploadAliOSS";
import multer from "koa-multer";
import VideosService from "../service/VideosService";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default class ActivityController {
  private readonly _activitiesService = new ActivitiesService(this.ctx);
  private readonly _videosService = new VideosService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async uploadMP4(files: any) {
    // console.log(files);
    console.log("资源上传开始");
    try {
      let urls = [];
      for (let file of files) {
        const name = Date.now() + "_" + file.originalname;
        const buffer = file.buffer;
        const url = await put(name, buffer);
        urls.push(url);
      }
      console.log("资源上传成功");
      return {
        urls,
      };
    } catch {
      console.log("资源上传失败");
    } finally {
      console.log("资源上传结束");
    }
  }

  public async addActivity() {
    const { teacherId, title, description, beginTime, endTime } = this.ctx
      .request.body as {
      teacherId: string;
      title: string;
      description: string;
      beginTime: Date;
      endTime: Date;
    };

    const createTime = Date.now();
    // todo
  }

  public async addVideo() {

    const { teacherId, activityId, videoPath } = this.ctx.request.body as {
      teacherId: string;
      activityId: string;
      videoPath: string;
    };

    const creationTime = new Date();

    console.log(teacherId, activityId, videoPath);

    const res = await this._videosService.addVideo({
      teacherId,
      activityId,
      videoPath,
      creationTime,
    });

    return res;
  }

  public async getVideosByActivityId() {
    const activityId = this.ctx.query.activityId as string;
    if (activityId) {
      const videos = await this._videosService.getVideosByActivityId(
        activityId
      );
      return videos;
    } else {
      this.ctx.status = 400;
    }
  }

  public async getActivities() {
    const teacherId = this.ctx.query.teacherId as string;
    if (teacherId) {
      const activities = await this._activitiesService.getActivitiesByTeacherId(
        teacherId
      );
      return activities;
    } else {
      const activities = await this._activitiesService.getActivities();
      return activities;
    }
  }

  public async getActivity() {
    const activityId = this.ctx.query.activityId as string;
    if (activityId) {
      const activity = await this._activitiesService.findActivityById(
        activityId
      );
      return activity;
    } else {
      this.ctx.status = 400;
    }
  }
}
