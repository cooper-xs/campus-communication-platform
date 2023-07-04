<template>
  <el-scrollbar class="h-full">
    <div class="flex justify-between">
      <el-divider content-position="right">
        <el-switch v-model="switchOnlyMe" active-text="只看我" class="ml-5" @change="checkSwitchState(1)" />
        <el-switch v-model="switchOnlyStudent" active-text="只看学生" class="ml-5" @change="checkSwitchState(2)" />
        <el-switch v-if="props.userType === 'admin'" v-model="switchReview" active-text="审核" class="ml-5"
          @change="checkSwitchState(3)"></el-switch>
      </el-divider>
    </div>
    <div v-if="posts.length === 0">
      <el-empty description="没有符合条件的帖子" />
    </div>
    <div v-else class="masonry">
      <el-col v-for="post in posts" :key="post.postId" class="masonry-item min-w-184px">
        <el-card class="my-4 cursor-pointer" :body-style="{ padding: '0px' }" @click="openPost(post)">
          <template v-slot:header>
            <div class="flex justify-between">
              <span class="font-bold">{{ post.title }}</span>
              <div>
                <el-tag v-if="post.state === 1" type="warning">待审核</el-tag>
                <el-tag v-else-if="post.state === 3" type="danger">审核未通过</el-tag>
                <el-tag v-else-if="post.state === 4" type="info">草稿未发布</el-tag>
                <el-tag v-if="post.userType === 'teacher'" class="ml-3">老师帖</el-tag>
              </div>
            </div>
          </template>
          <div class="p-3">
            {{ post.content }}
          </div>
          <img :src="post.postImg" class="w-full" />
        </el-card>
      </el-col>
    </div>

  </el-scrollbar>
  <el-drawer v-if="currentPost" v-model="drawer" :title="'发帖人: ' + currentPost.nickName" size="50%" z-index="1000"
    :before-close="handleClose" class="bg-gradient-to-b from-red-300 to-blue-200">
    <el-scrollbar height="">
      <div class="p-2">
        <!-- <el-divider /> -->
        <div class="flex justify-between">
          <div class="p-3 font-bold">
            {{ currentPost.title }}
          </div>
          <div class="flex flex-row items-center">
            <el-tag v-if="currentPost.state === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if="currentPost.state === 3" type="danger">审核未通过</el-tag>
            <el-tag v-else-if="currentPost.state === 4" type="info">草稿未发布</el-tag>
            <div v-if="currentPost.userType === props.userType && currentPost.userId === props.userId" class="mx-5">
              <el-button type="danger" @click="deletePost">删除</el-button>
              <el-button v-if="currentPost.state === 4" type="primary" @click="publishPost(currentPost)">去发布</el-button>
              <el-button v-else type="primary" @click="publishPost(currentPost)">去修改</el-button>
            </div>
            <div v-else-if="props.userType === 'admin'" class="mx-5">
              <!-- <el-button :disabled="currentPost.state !== 1 && currentPost.state !== 3" type="success"
                @click="reviewPost(0)">审核通过</el-button>
              <el-button :disabled="currentPost.state !== 1 && currentPost.state !== 2" type="danger"
                @click="reviewPost(1)">审核不通过</el-button>
              <el-button :disabled="currentPost.state !== 1 && currentPost.state !== 4" type="warning"
                @click="reviewPost(2)">改为待审核</el-button> -->
              <el-button type="success" @click="reviewPost(0)">审核通过</el-button>
              <el-button type="danger" @click="reviewPost(1)">审核不通过</el-button>
              <el-button type="warning" @click="reviewPost(2)">改为待审核</el-button>
            </div>
          </div>
        </div>
        <div class="p-3">
          发帖时间: {{ timeUsual(currentPost.creationTime.toString()) +
            " (" + timeDiff(currentPost.creationTime.toString()) + ")" }}
        </div>
        <div class="p-3">
          {{ currentPost.content }}
        </div>
        <img :src="currentPost.postImg" class="w-full" />
      </div>
      <el-divider />
      <el-form :model="commentForm" label-width="60px" :disabled="props.userType === ''">
        <el-form-item label="评论">
          <el-input v-model="commentForm.content" type="textarea" :rows="3" placeholder="请输入内容" :maxlength="100"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment()">{{ props.userType === '' ? "请先登录" : "发表评论" }}</el-button>
        </el-form-item>
      </el-form>
      <el-card v-for="comment in comments" :key="comment.commentId" class="my-5 mx-20" shadow="hover">
        <!-- 评论 -->
        <div class="flex justify-between pb-4">
          <div class="flex flex-row">
            <div class="font-bold mr-5">{{ comment.nickName }}</div>
            <el-tag v-if="comment.userType === 'teacher'">老师</el-tag>
          </div>
          <div>
            {{ timeUsual(comment.creationTime.toString()) +
              " (" + timeDiff(comment.creationTime.toString()) + ")" }}
          </div>
        </div>
        <div class="flex justify-between mb-6">
          <div>{{ comment.content }}</div>
          <el-button type="primary" link @click="openReply(1, comment, comment.commentId)">回复</el-button>
        </div>
        <!-- 回复 -->
        <div v-for="reply in comment.replys" :key="reply.replyId" class="ml-3">
          <div class="flex justify-between pb-4">
            <div class="flex flex-row">
              <div class="font-bold mr-5">{{ reply.nickName }}</div>
              <!-- <el-tag v-if="reply.userType === 'teacher'">老师</el-tag> -->
              <p class="mr-5 text-blue-400">回复给></p>
              <div class="font-bold mr-5">{{ reply.parentReplyNickname }}</div>
            </div>

            <div>
              {{ timeUsual(reply.creationTime.toString()) +
                " (" + timeDiff(reply.creationTime.toString()) + ")" }}
            </div>
          </div>
          <div class="flex justify-between mb-6">
            <div>{{ reply.content }}</div>
            <el-button type="primary" link @click="openReply(2, reply, comment.commentId)">回复</el-button>
          </div>
        </div>
      </el-card>
    </el-scrollbar>
    <el-drawer v-model="innerDrawer" :title="'回复给>' + currentReplyObj?.nickName" append-to-body="true"
      :before-close="handleReplyClose" class="bg-gradient-to-b from-red-300 to-blue-200">
      <el-form :model="replyForm" label-width="60px" :disabled="props.userType === ''">
        <el-form-item label="评论">
          <el-input v-model="replyForm.content" type="textarea" :rows="3" placeholder="请输入内容" :maxlength="100"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitReply()">{{ props.userType === '' ? "请先登录" : "发表评论" }}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus/lib/components/index.js';
import { onMounted, ref, reactive, computed } from 'vue'
import type { reply, comment, post } from '@/types'
import Http from '@/utils/Http';
import timeDiff from '@/utils/timeDiff';
import timeUsual from '@/utils/timeUsual';
import router from '@/router';

const props = defineProps({
  userType: {
    type: String,
  },
  userId: {
    type: String,
  },
  nickName: {
    type: String,
  },
  student: {
    type: Object,
  },
  teacher: {
    type: Object,
  },
  admin: {
    type: Object,
  }
})

const posts = ref<post[]>([])
const comments = ref<comment[]>([])
const drawer = ref(false)
const innerDrawer = ref(false)
const currentPost = ref<post>()
const switchOnlyMe = ref(false)
const switchOnlyStudent = ref(false)
const switchReview = ref(false)

const initCommentForm: comment = {
  commentId: '',
  userType: '',
  userId: '',
  postId: '',
  content: '',
  creationTime: new Date(),
  nickName: '',
  replys: [],
}
const commentForm = reactive({ ...initCommentForm });

const initReplyForm: reply = {
  replyId: '',
  userType: '',
  userId: '',
  commentId: '',
  content: '',
  creationTime: new Date(),
  nickName: '',
  parentReplyNickname: '',
}
const replyForm = reactive({ ...initReplyForm });

const currentCommentId = ref('')
const currentReplyObj = ref<reply | comment>()

onMounted(() => {
  fetchPosts()
})

const fetchPosts = async () => {
  const userType = switchOnlyStudent.value ? 'student' : props.userType;
  if (switchOnlyMe.value) {
    posts.value = await Http.get('/getPosts', { params: { userType, userId: props.userId } });
  } else if (switchOnlyStudent.value) {
    posts.value = await Http.get('/getPosts', { params: { userType } });
  } else {
    posts.value = await Http.get('/getPosts');
  }
  if (props.userType !== 'admin') {
    // 筛选未审核/审核不通过/草稿 且 不是自己的帖子
    posts.value = posts.value.filter(post => !(post.state !== 0 && post.state !== 2 && post.userId !== props.userId))
  }

  if (switchReview.value) { // 确认审核
    posts.value = posts.value.filter(post => post.state === 1);
    return;
  }
}

const checkSwitchState = (flag: number) => {
  if (flag === 1) {
    if (switchOnlyMe.value) { // 确认只看我
      if (!props.userType) {
        ElMessage.warning('请先登录')
        switchOnlyMe.value = false;
        return;
      }

      if (props.userType !== 'student') {
        switchOnlyStudent.value = false;
      }
    }
  } else if (flag === 2) {
    if (switchOnlyStudent.value) { // 确认只看学生
      if (props.userType !== 'student') {
        console.log('props.userType', props.userType)
        switchOnlyMe.value = false;
      }
    }
  } else if (flag === 3) {
    //
  }

  fetchPosts();
}

const openPost = async (post: post) => {
  currentPost.value = post
  await fetchComments(post.postId)
  fetchReplys(comments.value)
  drawer.value = true
}

const openReply = (flag: number, item: reply | comment, commentId: string) => {
  if (!props.userType) {
    ElMessage.warning('请先登录')
    return
  }
  currentReplyObj.value = item
  currentCommentId.value = commentId
  innerDrawer.value = true
}

const fetchComments = async (postId: string) => {
  comments.value = await Http.get('/getComments', { params: { postId } })
}

const fetchReplys = async (comments: comment[]) => {
  comments.forEach(async (comment) => {
    comment.replys = await Http.get('/getReplys', { params: { commentId: comment.commentId } })
  })
}

const submitComment = async () => {
  if (commentForm.content === '') {
    ElMessage.warning('请填写评论内容, 100字以内')
    return
  }
  const addCommentParams = {
    userId: localStorage.getItem('userId'),
    userType: props.userType,
    postId: currentPost.value?.postId,
    content: commentForm.content,
    nickName: props.userType === 'student' ? props.student?.nickName : props.teacher?.nickName,
  }

  const res = await Http.post('/addComment', addCommentParams);

  if (res) {
    ElMessage.success('评论成功')
    commentForm.content = ''
    await fetchComments(currentPost.value!.postId)
    fetchReplys(comments.value)
  } else {
    ElMessage.error('评论失败')
  }
}

const submitReply = async () => {
  if (replyForm.content === '') {
    ElMessage.warning('请输入内容')
    return
  }
  const addReplyParams = {
    userId: localStorage.getItem('userId'),
    userType: props.userType,
    commentId: currentCommentId.value,
    content: replyForm.content,
    nickName: props.userType === 'student' ? props.student?.nickName : props.teacher?.nickName,
    parentReplyNickname: currentReplyObj.value?.nickName,
  }

  const res = await Http.post('/addReply', addReplyParams);

  if (res) {
    ElMessage.success('回复成功')
    replyForm.content = ''
    await fetchComments(currentPost.value!.postId)
    fetchReplys(comments.value)
    innerDrawer.value = false
  } else {
    ElMessage.error('回复失败')
  }
}

const handleClose = (done: any) => {
  done()
}

const handleReplyClose = (done: any) => {
  done()
}

const deletePost = () => {
  ElMessageBox.confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await Http.post('/deletePost', { postId: currentPost.value?.postId })
    if (res) {
      ElMessage.success('删除成功')
      await fetchPosts()
      drawer.value = false
    } else {
      ElMessage.error('删除失败')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

const publishPost = (post: post) => {
  router.push({
    path: '/home/post/publish',
    query: {
      postId: post.postId,
    },
  })
}

const reviewPost = async (flag: number) => {
  const reviewParams = {
    postId: currentPost.value?.postId,
    status: flag,  // 审核形式：0-审核通过，1-审核不通过, 2-待审核
    adminId: localStorage.getItem('userId'),
  }
  console.log(reviewParams)
  const res = await Http.post('/reviewPost', reviewParams);
  if (res) {
    if (reviewParams.status === 0) {
      ElMessage.success('审核通过');
    } else if (reviewParams.status === 1) {
      ElMessage.warning('审核不通过');
    } else {
      ElMessage.info('修改为待审核状态');
    }
    await fetchPosts()
    if (switchReview.value) {
      posts.value = posts.value.filter(post => post.state === 1)
    }
    // drawer.value = false
  } else {
    ElMessage.error('审核失败')
  }
} 
</script>

<style scoped>
.masonry {
  /* column-count: 4; */
  column-gap: 20px;
}

/* For mobile devices */
@media (max-width: 600px) {
  .masonry {
    column-count: 1;
  }
}

/* For tablet devices */
@media (min-width: 601px) and (max-width: 900px) {
  .masonry {
    column-count: 2;
  }
}

@media (min-width: 901px) and (max-width: 1200px) {
  .masonry {
    column-count: 3;
  }
}

/* For desktop devices */
@media (min-width: 1201px) {
  .masonry {
    column-count: 4;
  }
}

.masonry-item {
  break-inside: avoid;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  margin-bottom: 20px;
  display: inline-block;
  width: 90%;
  box-sizing: border-box;
}
</style>