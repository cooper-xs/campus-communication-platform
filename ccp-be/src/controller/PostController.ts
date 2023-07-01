import { Context } from "koa";
import type { updatePost } from "../types";
import PostsService from "../service/PostsService";
import CommentsService from "../service/CommentsService";
import { tool } from "../utils/tool";
import ReplyService from "../service/ReplyService";

export default class PostController {
  private readonly _postsService: PostsService;
  private readonly _commentsService: CommentsService;
  private readonly _replyService: ReplyService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._postsService = new PostsService(this.ctx);
    this._commentsService = new CommentsService(this.ctx);
    this._replyService = new ReplyService(this.ctx);
  }

  public async updatePost() {
    const { postId, userType, userId, title, content, nickName, postImg, state } = this.ctx.request
      .body as updatePost;

    // 打印所有参数
    console.log(postId, userType, userId, title, content, nickName, postImg);

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    if(postId) {
      const res = await this._postsService.updatePost({
        postId,
        userType,
        userId,
        title,
        content,
        postImg,
        creationTime,
        nickName,
        state,
      });
      return res;
    } else {
      const res = await this._postsService.updatePost({
        userType,
        userId,
        title,
        content,
        postImg,
        creationTime,
        nickName,
        state,
      });
      return res;
    }
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
    const { userType, userId } = this.ctx.query as {
      userType: string;
      userId: string;
    };

    if (userId && userType) {
      const res = await this._postsService.getPostsByUserTypeAndId(
        userType,
        userId
      );
      return res;
    } else if (userType) {
      const res = await this._postsService.getPostsByUserType(userType);
      return res;
    } else {
      const res = await this._postsService.getPosts();
      return res;
    }
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

  public async addComment() {
    const { postId, userId, userType, content, nickName } = this.ctx.request
      .body as {
      postId: number;
      userId: string;
      userType: string;
      content: string;
      nickName: string;
    };

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    const res = await this._commentsService.addComment({
      postId,
      userId,
      userType,
      content,
      creationTime,
      nickName,
    });

    return res;
  }

  public async getReplys() {
    const { commentId } = this.ctx.query as { commentId: string };
    if (commentId) {
      const res = await this._replyService.getReplysByCommentId(
        tool.toNumber(commentId)
      );
      return res;
    } else {
      const res = await this._replyService.getReplysAll();
      return res;
    }
  }

  public async addReply() {
    const {
      commentId,
      userId,
      userType,
      content,
      nickName,
      parentReplyNickname,
    } = this.ctx.request.body as {
      commentId: number;
      userId: string;
      userType: string;
      content: string;
      nickName: string;
      parentReplyNickname: string;
    };

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    console.log(commentId);

    const res = await this._replyService.addReply({
      commentId,
      userId,
      userType,
      content,
      creationTime,
      nickName,
      parentReplyNickname,
    });

    return res;
  }
}
