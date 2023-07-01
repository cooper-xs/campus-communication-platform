import { Context } from "koa";
import type { newPost } from "../types";
import PostsService from "../service/PostsService";
import CommentsService from "../service/CommentsService";
import { tool } from "../utils/tool";

export default class PostController {
  private readonly _postsService: PostsService;
  private readonly _commentsService: CommentsService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._postsService = new PostsService(this.ctx);
    this._commentsService = new CommentsService(this.ctx);
  }

  public async addPost() {
    const { userId, title, content } = this.ctx.request.body as newPost;

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
    const { postId, pinnedState } = this.ctx.request.body as {
      postId: number;
      pinnedState: number;
    };

    const res = await this._postsService.reviewPost(postId, pinnedState);

    return res;
  }

  public async getPosts() {
    const res = await this._postsService.getPosts();
    return res;
  }

  public async getComments() {
    const { postId } = this.ctx.query;
    if (postId) {
      const res = await this._commentsService.getCommentsByPostId(
        tool.toNumber(postId)
      );
      return res;
    } else {
      const res = await this._commentsService.getCommentsAll();
      return res;
    }
  }
}
