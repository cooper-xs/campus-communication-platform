import { Context } from "koa";
import type { updatePost } from "../types";
import PostsService from "../service/PostsService";
import CommentsService from "../service/CommentsService";
import { tool } from "../utils/tool";
import ReplyService from "../service/ReplyService";
import PostReviewService from "../service/PostReviewService";

export default class PostController {
  private readonly _postsService: PostsService;
  private readonly _commentsService: CommentsService;
  private readonly _replyService: ReplyService;
  private readonly _postReviewService: PostReviewService;

  public constructor(private readonly ctx: Context) {
    this.ctx = ctx;
    this._postsService = new PostsService(this.ctx);
    this._commentsService = new CommentsService(this.ctx);
    this._replyService = new ReplyService(this.ctx);
  }

  public async updatePost() {
    const {
      postId,
      userType,
      userId,
      title,
      content,
      nickName,
      postImg,
      state,
    } = this.ctx.request.body as updatePost;

    // 打印所有参数
    console.log(postId, userType, userId, title, content, nickName, postImg);

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

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
    const { postId, status, adminId } = this.ctx.request.body as {
      postId: number;
      status: number; // 审核形式：0-审核通过，1-审核不通过, 2-待审核
      adminId: number;
    };

    let state = 0;

    if(status === 0) {
      state = 2;
    } else if(status === 1) {
      state = 3;
    } else if(status === 2) {
      state = 1;
    }

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);

    const res = await this._postsService.reviewPost(postId, state);

    const postReview = await this._postReviewService.addPostReview({
      postId,
      adminId,
      status,
      creationTime,
    })

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

  public async addPostReview() {
    const { postId, adminId, status } = this.ctx.request.body as {
      postId: number;
      adminId: string;
      status: number;
    };

    const creationTime = new Date();
    creationTime.setSeconds(creationTime.getSeconds() - 1);
    
    let flag = 0;

    if(status === 0) {
      const res = await this._postsService.passPost(postId);
      flag = res.affectedRows;
    } else if(status === 1) {
      const res = await this._postsService.rejectPost(postId);
      flag = res.affectedRows;
    } else if(status === 2) {
      const res = await this._postsService.waittingReviewPost(postId);
      flag = res.affectedRows;
    } else {
      this.ctx.status = 400;
    }

    if(flag) {
      const res = await this._postReviewService.addPostReview({
        postId,
        adminId,
        status,
        creationTime,
      });
      return res;
    } else {
      this.ctx.status = 400;
    }
  }
}
