<template>
  <div>
    <div class="masonry">
      <el-col v-for="post in posts" :key="post.postId" class="masonry-item min-w-184px">
        <el-card class="my-4 cursor-pointer" :body-style="{ padding: '0px' }" @click="openPost(post)">
          <template v-slot:header>
            <div class="flex justify-between">
              <span class="font-bold">{{ post.title }}</span>
              <el-tag v-if="post.userType === 'teacher'">老师帖</el-tag>
            </div>
          </template>
          <div class="p-3">
            {{ post.content }}
          </div>
          <img :src="post.postImg" class="w-full" />
        </el-card>
      </el-col>
    </div>
    <el-drawer v-model="drawer" :title="currentPost?.title" :before-close="handleClose">

      <div class="p-3">
        {{ currentPost?.content }}
      </div>
      <img :src="currentPost?.postImg" class="w-full" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus/lib/components/index.js';
import { onMounted, ref } from 'vue'
import type { reply, comment, post } from '@/types'
import Http from '@/utils/Http';

const posts = ref<post[]>([])
const comments = ref<comment[]>([])
const replys = ref<reply[]>([])
const drawer = ref(false)
const currentPost = ref<post>()
const currentUser = ref({
  nickname: '',
})

onMounted(() => {
  fetchPosts()
})

const fetchPosts = async () => {
  posts.value = await Http.get('/getPosts');
  console.log(posts.value);
}

const openPost = async (post: post) => {
  currentPost.value = post
  await fetchComments(post.postId)
  fetchReplys(comments.value)
  drawer.value = true
}

const fetchComments = async (postId: string) => {
  comments.value = await Http.get('/getComments', { params: { postId } })
  console.log(comments.value);
}

const fetchReplys = async (comments: comment[]) => {
  replys.value = await Http.get('/getReplys', { params: { comments } })
  console.log(replys.value);
}

const handleClose = (done: any) => {
  done()
  //   ElMessage({
  //     message: '关闭后所有未保存的内容将会丢失',
  //     type: 'warning',
  //     duration: 0,
  //     showClose: true,
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     beforeClose: async (action, instance, done) => {
  //       if (action === 'confirm') {
  //         instance.confirmButtonLoading = true
  //         instance.confirmButtonText = '执行中...'
  //         await delay(1000) // 等待中...
  //         done()
  //         setTimeout(() => {
  //           instance.confirmButtonLoading = false
  //         }, 300)
  //       } else {
  //         done()
  //       }
  //     },
  //   }).then(() => {
  //     done()
  //   }).catch(() => {
  //     ElMessage.info('取消关闭')
  //   })
}
</script>

<style scoped>
.masonry {
  /* column-count: 4; */
  column-gap: 20px;
}

.masonry {
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