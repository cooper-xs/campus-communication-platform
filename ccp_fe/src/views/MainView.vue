<template>
  <el-container>
    <el-header class="header">
      <div class="logo">校园交流平台</div>
      <div v-if="userType" class="user-info">
        <el-button type="text" class="text-white" @click="router.push('/')">{{ student.nickName }}</el-button>
        <el-button type="text" class="text-white" @click="logout">退出</el-button>
      </div>
      <div v-else class="user-actions">
        <el-button type="text" class="text-white" @click="login">登录</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside class="aside">
        <el-menu :default-active="$route.path">
          <el-menu-item index="/posts">
            <i class="el-icon-document"></i>
            <span>帖子</span>
          </el-menu-item>
          <el-menu-item index="/activities">
            <i class="el-icon-date"></i>
            <span>活动</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import router from "@/router";
import Http from "@/utils/Http";
import ElMessage from "element-plus/lib/components/message/index.js";
import { onMounted, ref } from "vue";

const userType = ref('')
const student = ref({
  studentId: '',
  nickName: '',
  name: '',
  email: '',
  password: '',
  grade: 0,
  class: '',
  pid: '',
})

onMounted(async () => {
  userType.value = localStorage.getItem('userType') || '';
  if (userType.value === 'student') {
    student.value.studentId = localStorage.getItem('userId') || '';
    // console.log('查询参数', student.value.studentId);
    student.value = await Http.get('/getStudentById', { params: { studentId: student.value.studentId } });
    // console.log('查询结果', student.value);

  }
});

const login = () => {
  router.push('/login');
};

const logout = () => {
  ElMessage.success('退出成功');
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
  userType.value = '';
  // router.push('/');
};
</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409eff;
  color: #ffffff;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
}

.aside {
  width: 200px;
  background-color: #f5f7fa;
}
</style>
