import { Context } from "koa";
import { VideosRepository } from "../config/data-source";

export default class VideosService {
  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
  }

  public async addVideo(video: any) {
    const newVideo = await VideosRepository.save(video);
    return newVideo;
  }
  
  public async getVideosById(videoId: string) {
    const videos = await VideosRepository.find({
      where: { videoId }
    });
    return videos;
  }

  public async getVideosByActivityId(activityId: string) {
    const videos = await VideosRepository.find({
      where: { activityId }
    });
    return videos;
  }
}