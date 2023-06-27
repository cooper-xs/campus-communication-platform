import { Context } from "koa";
import type { newPost } from "../types";
import PostsService from "../service/PostsService";

export default class PostController {
  private readonly _postsService: PostsService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._postsService = new PostsService(this.ctx);
  }

  public async addPost() {
    const {userId, title, content } = this.ctx.request.body as newPost;

    const res = await this._postsService.addPost({
      userId,
      title,
      content,
      pinnedState: 0,
      creationTime: new Date(),
    });
    
    return res;
  }

  public async reviewPost() {
    const { postId, pinnedState } = this.ctx.request.body as { postId: number, pinnedState: number };

    const res = await this._postsService.reviewPost(postId, pinnedState);
    
    return res; 
  }

  public async getPostsAsPage() {
    const { page, pageSize } = this.ctx.request.body as { page: number, pageSize: number };

    const res = await this._postsService.getPostsAsPage(page, pageSize);
    
    return res;
  }
}