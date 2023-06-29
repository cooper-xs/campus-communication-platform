<template>
  <div>
    <el-form :model="profileForm" label-width="120px">
      <!-- 公共信息 -->
      <el-form-item label="昵称">
        <el-input v-model="profileForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="profileForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="profileForm.email"></el-input>
      </el-form-item>
      <!-- 针对学生的信息 -->
      <div v-if="userType === 'student'">
        <el-form-item label="年级">
          <el-input v-model="profileForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="profileForm.academy"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="profileForm.class"></el-input>
        </el-form-item>
      </div>
      <!-- 针对教师的信息 -->
      <div v-if="userType === 'teacher'">
        <el-form-item label="学院">
          <el-input v-model="profileForm.academy"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button type="info" @click="goToVerification">身份认证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';

const props = defineProps({
  userType: {
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

const profileForm = ref({} as any);

onMounted(async () => {
  if (props.userType === 'student') {
    profileForm.value = props.student;
  } else if (props.userType === 'teacher') {
    profileForm.value = props.teacher;
  } else if (props.userType === 'admin') {
    profileForm.value = props.admin;
  }
});

const submitForm = async () => {
  // 保存个人信息
  const totalParams = {
    userType: props.userType,
    ...profileForm.value,
  }
  const res = await Http.post('/updateProfile', totalParams);
  if (res) {
    ElMessage.success('保存成功');
  } else {
    ElMessage.error('保存失败');
  }
};

const goToVerification = () => {
  // 跳转到身份认证页面
  router.push('/home/profile/verify');
};
</script>