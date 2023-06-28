import { Context } from "koa";
import ActivitiesService from "../service/ActivitiesService";
import { client, put } from "../utils/uploadAliOSS";
import multer from "koa-multer";

// 配置存储
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default class ActivityController {
  private readonly _activitiesService = new ActivitiesService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async upload() {
    console.log("资源上传中");
    try {
      console.log("1");
      await upload.single("file")(this.ctx, async () => {
        // 文件在ctx.request.file中
        console.log("2");
        const file = this.ctx.request.file;
        console.log("3");
        const name = Date.now() + "_"; // 使用时间戳和原始文件名生成新的文件名，以防止重复
        console.log("4", name);
        const buffer = Buffer.from(file as any);
        console.log("5");
        const url = await put(name, buffer); // 将文件buffer传给put函数
        console.log("上传资源成功: ", url);
        return { url };
      });
    } catch (error) {
      this.ctx.status = 500;
    } finally {
      console.log("资源上传结束");
    }
    // try {
    //   const url = await put();
    //   console.log(url);
    //   return { url };
    // } catch (error) {
    //   this.ctx.status = 500;
    // }
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
    console.log("getActivity");
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
