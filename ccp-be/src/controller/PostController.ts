import { Context } from "koa";
import type { updatePost } from "../types";
import PostsService from "../service/PostsService";
import CommentsService from "../service/CommentsService";
import { tool } from "../utils/tool";
import ReplyService from "../service/ReplyService";
import PostReviewService from "../service/PostReviewService";
import ToprequestsService from "../service/ToprequestsService";

export default class PostController {
  private readonly _postsService: PostsService;
  private readonly _commentsService: CommentsService;
  private readonly _replyService: ReplyService;
  private readonly _postReviewService: PostReviewService;
  private readonly _toprequestsService: ToprequestsService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._postsService = new PostsService(this.ctx);
    this._commentsService = new CommentsService(this.ctx);
    this._replyService = new ReplyService(this.ctx);
    this._postReviewService = new PostReviewService(this.ctx);
    this._toprequestsService = new ToprequestsService(this.ctx);
  }

  public async updatePost() {
    let {
      postId,
      userType,
      userId,
      title,
      content,
      nickName,
      postImg,
      state,
      creationTime,
    } = this.ctx.request.body as updatePost;

    if (!creationTime) {
      creationTime = new Date();
      creationTime?.setSeconds(creationTime.getSeconds() - 1);
    }

    if (postId) {
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
      postId = res.postId;
    }

    const res = await this._postsService.getPostByPostId(postId);

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

  public async getPostByPostId() {
    const { postId } = this.ctx.query as { postId: string };

    const res = await this._postsService.getPostByPostId(tool.toNumber(postId));

    return res;
  }

  public async deletePost() {
    const { postId } = this.ctx.request.body as { postId: number };

    const res = await this._postsService.deletePost(postId);

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

  public async addPostReview() {
    const { postId, adminId, status } = this.ctx.request.body as {
      postId: number;
      adminId: string; // 审核形式：0-审核通过，1-审核不通过, 2-待审核
      status: number;
    };

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    let flag = 0;

    if (status === 0) { // 审核通过
      const res = await this._postsService.passPost(postId);
      flag = res ? 1 : 0;
    } else if (status === 1) { // 审核不通过
      const res = await this._postsService.rejectPost(postId);
      flag = res ? 1 : 0;
    } else if (status === 2) { // 改为待审核
      const res = await this._postsService.waittingReviewPost(postId);
      flag = res ? 1 : 0;
    } else {
      this.ctx.status = 400;
    }

    if (flag) {
      const res = await this._postReviewService.addPostReview(
        postId,
        adminId,
        status,
        creationTime
      );
      return res;
    } else {
      this.ctx.status = 400;
    }
  }

  public async applyForTop() {
    const { postId, userId, userType, endTime } = this.ctx.request.body as {
      postId: number;
      userId: string;
      userType: string;
      endTime: Date;
    };

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    const res = await this._toprequestsService.addTopRequests(
      postId,
      userId,
      userType,
      creationTime,
      endTime
    );

    return res;
  }

  public async setTop() {
    const { requestId, adminId, endTime, state } = this.ctx.request.body as {
      requestId: number;
      adminId: number;
      endTime: Date;
      state: number;
    };

    const res = await this._toprequestsService.setTop(
      requestId,
      adminId,
      state,
      endTime
    );

    return res;
  }

  public async getTopPostIds() {
    const res = await this._toprequestsService.getTopRequests();

    res.filter((item) => {
      return item.state === 1 && item.endTime > new Date();
    });

    return res.map((item) => {
      return item.postId;
    });
  }

  public async getReviews() {
    const res = await this._postReviewService.getPostReviews();
    return res;
  }

  public async getTopRequests() {
    const res = await this._toprequestsService.getTopRequests();
    return res;
  }
}
