import { Context } from "koa";
import ActivitiesService from "../service/ActivitiesService";
import { put, deleteFile } from "../utils/AliyunOSS";
import multer from "koa-multer";
import VideosService from "../service/VideosService";
import RegistrationsService from "../service/RegistrationsService";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default class ActivityController {
  private readonly _activitiesService = new ActivitiesService(this.ctx);
  private readonly _videosService = new VideosService(this.ctx);
  private readonly _registrationService = new RegistrationsService(this.ctx);

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async uploadFile(files: any) {
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

  public async deleteFile() {
    const { url } = this.ctx.request.body as {
      url: string;
    };
    try {
      const filename = url.split("/").pop();
      console.log(filename);
      await deleteFile(filename);
      this.ctx.status = 204;
    } catch {
      console.log("资源删除失败");
    }
  }

  public async deleteVideo() {
    const { videoId } = this.ctx.request.body as {
      videoId: string;
    };
    const res = await this._videosService.deleteVideo(videoId);
    return res;
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

    const creationTime = new Date();

    const res = await this._activitiesService.addActivity({
      teacherId,
      title,
      description,
      beginTime,
      endTime,
      creationTime,
    });

    return res;
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

  public async signUpActivity() {
    const { studentId, activityId } = this.ctx.request.body as {
      studentId: string;
      activityId: string;
    };
    const registrationTime = new Date();
    const registration = {
      studentId,
      activityId,
      registrationTime,
    }
    const res = await this._registrationService.singUpActivity(registration)
    return res;
  }

  public async getSignUpFlag() {
    const { studentId, activityId } = this.ctx.query as {
      studentId: string;
      activityId: string;
    };
    const res = await this._registrationService.getSignUpFlag(studentId, activityId);
    return res;
  }

  public async updateActivity() {
    const { activityId, title, description, beginTime, endTime } = this.ctx
      .request.body as {
      activityId: string;
      title: string;
      description: string;
      beginTime: Date;
      endTime: Date;
    };
    const res = await this._activitiesService.updateActivity({
      activityId,
      title,
      description,
      beginTime,
      endTime,
    });
    return res;
  }

  public async getRegistrations() {
    const activityId = this.ctx.query.activityId as string;
    if (activityId) {
      const registrations = await this._registrationService.getRegistrationsByActivityId(activityId);
      return registrations;
    } else {
      this.ctx.status = 400;
    }
  }

  public async reviewRegistration() {
    const { registrationId, state } = this.ctx.request.body as {
      registrationId: string;
      state: string;
    };
    const res = await this._registrationService.reviewRegistration(registrationId, state);
    return res;
  }
}
