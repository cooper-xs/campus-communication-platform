<template>
  <div v-if="submited">
    <el-result icon="success" title="提交成功" sub-title='可在 "帖子列表" 选择 "只看我" 中找到'>
      <template #extra>
        <el-button type="primary" @click="toPosts">前往</el-button>
      </template>
    </el-result>
  </div>
  <el-form v-else :model="form" label-width="120px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" :maxlength="20" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="form.content" type="textarea" :rows="4" :maxlength="200" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="上传图片">
      <el-upload action="/api/uploadMP4" drag :limit="1" :on-success="handleSuccess" :on-remove="handleRemove">
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
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import router from '@/router';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';
import { ref } from 'vue';

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
  post_img: ''
});
const submited = ref(false);
import sensitiveWords from '@/utils/sensitiveWords'
import { fa } from 'element-plus/lib/locale/index.js';

const handleSuccess = (response: any) => {
  if (response.code === 20000) {
    form.value.post_img = response.data.url;
  } else {
    ElMessage.error('图片上传失败');
  }
};

const handleRemove = () => {
  form.value.post_img = '';
};

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

const submitForm = async () => {
  const { title, content, post_img } = form.value;
  if (!title || !content) {
    ElMessage.warning('标题和内容不能为空');
    return;
  }

  let state = 0;

  if(checkContent(title) || checkContent(content)) {
    ElMessage.info('等待审核')
    state = 1;
  }

  const postParams = {
    title, content,
    post_img,
    userType: props.userType,
    userId: props.userId,
    nickName: props.nickName,
    state,
  }

  try {
    const response = await Http.post('/updatePost', postParams);
    if (response) {
      form.value.title = '';
      form.value.content = '';
      form.value.post_img = '';
      submited.value = true;
      // ElMessage.success('提交成功');
    }
  } catch (error) {
    ElMessage.error('提交失败');
  }
};

const toPosts = () => {
  router.push('/home/post/list');
};
</script>
