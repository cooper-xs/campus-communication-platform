<template>
  <div v-if="props.student?.verified === 1 || props.teacher?.verified === 1">
    <el-result icon="success" title="您已成功认证" :sub-title="props.userType === 'student' ? '您可以发布帖子, 发布评论, 报名活动了!' : '您可以发布帖子, 发布评论, 发布活动和审批报名了!'">
      <template #extra>
        <el-button type="primary" @click="toPosts">查看帖子</el-button>
      </template>
    </el-result>
  </div>
  <div v-else>
    <el-form :model="form" label-width="120px">
      <el-form-item label="学院">
        <el-input v-model="form.academy" placeholder="请输入学院"></el-input>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input v-model="form.pid" placeholder="请输入证件号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="verifyDialogVisible = true">提交</el-button>
        <el-button @click="router.push('/home/post/list')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>你有未保存的更改，确定要离开吗？</span>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmLeave">确定</el-button>
      </template>
    </el-dialog>
  </div>
  <el-dialog v-model="verifyDialogVisible" title="确定" width="30%">
    <span>确认发布?</span>
    <template #footer>
      <el-button @click="verifyDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="verifyDialogVisible = false, submitForm()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Http from '@/utils/Http';
import { onBeforeRouteLeave, type NavigationGuardNext } from 'vue-router';
import router from '@/router';
import ElMessage from 'element-plus/lib/components/message/index.js';

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
  },
  verifyStatus: {
    type: Number,
  }
})

const emit = defineEmits(['updateVerify'])

const form = reactive({
  academy: '',
  pid: '',
  name: '',
});

const dialogVisible = ref(false);

const isChanged = ref(false);

let nextRoute = null as any;

const verifyDialogVisible = ref(false);

watch(form, () => {
  isChanged.value = true;
})

const submitForm = async () => {
  const verifyParams = {
    userName: form.name,
    pid: form.pid,
    userType: props.userType,
    academy: form.academy,
  }

  const res = await Http.post('/verify', verifyParams) as any;
  
  if(res) {
    console.log(res);
    emit('updateVerify', res.verified);
    ElMessage.success('认证成功');
  } else {
    ElMessage.error('认证失败');
  }
  isChanged.value = false;
};

onBeforeRouteLeave((to, from, next) => {
  if (isChanged.value) {
    dialogVisible.value = true;
    nextRoute = next;
  } else {
    next();
  }
});

const confirmLeave = () => {
  dialogVisible.value = false;
  isChanged.value = false;
  nextRoute();
};

const toPosts = () => {
  router.push('/home/post/list');
};
</script>
