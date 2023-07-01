<template>
  <div class="container">
    <el-form :model="loginForm" label-position="top" class="login-form">
      <h2 class="title">登录</h2>
      <el-form-item label="身份" prop="type">
        <el-select v-model="loginForm.type" placeholder="请选择身份">
          <el-option v-for="userType in userTypes" :key="userType" :label="userType" :value="userType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
        <el-button @click="register">注册</el-button>
        <el-button @click="router.push('/')">返回主页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/router';
import Http from '@/utils/Http';
import type { LoginForm } from '@/types';
import ElMessage from "element-plus/lib/components/message/index.js";

const submitLoading = ref(false);

const userTypes = ["管理员", "老师", "学生"]

const initLoginForm: LoginForm = {
  type: "",
  email: "",
  password: "",
};

const loginForm = reactive({ ...initLoginForm })

async function submitForm() {
  if (submitLoading.value) {
    return;
  }
  submitLoading.value = true;

  try {
    const loginParams = {
      ...loginForm,
    };
    if (loginForm.type === "管理员") {
      loginParams.type = "admin";
    } else if (loginForm.type === "老师") {
      loginParams.type = "teacher";
    } else if (loginForm.type === "学生") {
      loginParams.type = "student";
    }
    const user = await Http.post('/login', loginParams) as any;
    if(user) {
      localStorage.setItem("userType", loginParams.type);
      if(loginForm.type === "管理员") {
        localStorage.setItem("userId", user.adminId);
      } else if(loginForm.type === "老师") {
        localStorage.setItem("userId", user.teacherId);
      } else if(loginForm.type === "学生") {
        localStorage.setItem("userId", user.studentId);
      }
      router.push("/");
      ElMessage.success("登录成功");
    } else {
      ElMessage.error("登录失败");
    }
  } catch {
    ElMessage.error("登录失败");
  } finally {
    submitLoading.value = false;
  }
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
  // background-color: #f5f7fa;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
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

.el-form-item {
  width: 100%; // 新添加的样式
}

.user-type {
  width: 100%;
  margin-bottom: 20px;
}
</style>
