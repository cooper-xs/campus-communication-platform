<template>
  <div v-if="submited">
    <el-result icon="success" title="提交成功" sub-title='可在 "帖子列表" 选择 "只看我" 中找到'>
      <template #extra>
        <el-button type="primary" @click="toPosts">前往</el-button>
        <el-button type="primary" @click="reSubmit">再发一篇</el-button>
      </template>
    </el-result>
  </div>
  <div v-else>
    <el-form :model="form" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" :maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload action="/api/uploadFile" drag :limit="1" :before-upload="beforeUpload" :on-success="handleSuccess"
          :on-remove="handleRemove" :on-error="handleError">
          <el-icon><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖动到这里 或者 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              最多上传一张图片
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <img v-if="form.postImg !== ''" :src="form.postImg" class="h-60 w-60" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clickSubmitForm()">直接发布</el-button>
        <el-button type="info" @click="submitForm(2)">保存草稿</el-button>
        <el-tag v-if="currentPost?.state === 4" class="ml-3" type="warning">草稿</el-tag>
      </el-form-item>
    </el-form>
  </div>
  <el-dialog v-model="pushPostDialogVisible" title="确定" width="30%">
    <span>确认发布?</span>
    <template #footer>
      <el-button @click="pushPostDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="pushPostDialogVisible = false, submitForm(1)">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import router from '@/router';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';
import { onMounted, ref } from 'vue';
import sensitiveWords from '@/utils/sensitiveWords'
import type { post } from '@/types';

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

const form = ref({
  title: '',
  content: '',
  postImg: ''
});
const submited = ref(false);
const currentPost = ref<post>({
  postId: '',
  userType: '',
  userId: '',
  title: '',
  content: '',
  postImg: '',
  creationTime: new Date(),
  state: 0,
  nickName: '',
})
const pushPostDialogVisible = ref(false);

const clickSubmitForm = () => {
  const { title, content, postImg } = form.value;
  if (!title || !content) {
    ElMessage.warning('标题和内容不能为空');
    return;
  }
  pushPostDialogVisible.value = true;
}

onMounted(async () => {
  if (router.currentRoute.value.query.postId) {
    console.log(router.currentRoute.value.query.postId);
    currentPost.value.postId = router.currentRoute.value.query.postId as string;
    currentPost.value = await Http.get('/getPostByPostId', { params: { postId: currentPost.value.postId } });
    form.value.title = currentPost.value.title;
    form.value.content = currentPost.value.content;
    form.value.postImg = currentPost.value.postImg;
  }
})


const checkContent = (value: string) => {
  // 检查有没有敏感词
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < sensitiveWords.length; i++) {
    if (value.indexOf(sensitiveWords[i]) !== -1) {
      return true;
    }
  }
  return false;
}
const submitForm = async (flag: number) => {

  const { title, content, postImg } = form.value;

  let state = 0;

  if (flag === 1) { // 直接发布
    if (checkContent(title) || checkContent(content)) {
      state = 1;
    }
  } else if (flag === 2) { // 保存草稿
    state = 4;
  }

  const postParams = {
    postId: currentPost.value.postId ?? '',
    title,
    content,
    postImg,
    userType: props.userType,
    userId: props.userId,
    nickName: props.nickName,
    state,
    creationTime: currentPost.value.creationTime ?? null,
  }

  try {
    const response = await Http.post('/updatePost', postParams);
    if (response) {
      form.value.title = '';
      form.value.content = '';
      form.value.postImg = '';
      submited.value = true;
    }
    if (postParams.state === 0) {
      ElMessage.success('发布成功');
    } else if (postParams.state === 1) {
      ElMessage.info('您的帖子正等待管理员审核');
    } else if (postParams.state === 4) {
      ElMessage.info('您编辑的内容暂存在草稿箱')
    }
  } catch (error) {
    ElMessage.error('提交失败');
  }
};

const handleSuccess = (response: any, file: any, fileList: any) => {
  form.value.postImg = response.data.urls[0];
  ElMessage.success('上传成功');
};

const handleError = () => {
  ElMessage.error('图片上传失败，请重新上传');
};

const handleRemove = () => {
  if (form.value.postImg !== '') {
    Http.post('/deleteFile', { url: form.value.postImg })
      .then(() => {
        form.value.postImg = '';
        ElMessage.success('删除成功');
      }).catch(() => {
        ElMessage.error('删除失败');
      })
  }
};

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  // 还可以加别的类型
  const isLimit500k = file.size / 1024 / 1024 < 0.5;

  if (!isJPG && !isPNG) {
    ElMessage.error('上传帖子图片只能是 JPG/PNG 格式!');
  }
  if (!isLimit500k) {
    ElMessage.error('上传帖子图片大小不能超过 500k!');
  }
  return (isJPG || isPNG) && isLimit500k;
};

const toPosts = () => {
  router.push('/home/post/list');
};

const reSubmit = () => {
  router.push('/home/post/publish');
  submited.value = false;
  //  删去路由中的参数, 删去表格中多余的值
  currentPost.value.postId = '';
  currentPost.value.title = '';
  currentPost.value.content = '';
  currentPost.value.postImg = '';
  form.value.title = '';
  form.value.content = '';
  form.value.postImg = '';
};
</script>
