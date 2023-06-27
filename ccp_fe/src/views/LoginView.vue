<template>
  <div class="container">
    <el-form ref="loginForm" :model="loginForm" label-position="top" class="login-form">
      <h2 class="title">登录</h2>
      <el-select v-model="loginForm.userType" placeholder="请选择身份" class="user-type">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="老师" value="teacher"></el-option>
        <el-option label="学生" value="student"></el-option>
      </el-select>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';

const submitLoading = ref(false);

const loginForm = ref({
  userType: "",
  email: "",
  password: "",
});

async function submitForm() {
  if(submitLoading.value) {
    return;
  }
  submitLoading.value = true;

  const user = await Http.post('/login');

  submitLoading.value = false;
}

function register() {
  router.push("/register");
}
</script>

<style lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-form {
  width: 400px;
  padding: 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.user-type {
  width: 100%;
  margin-bottom: 20px;
}
</style>
