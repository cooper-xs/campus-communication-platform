<template>
  <div class="container">
    <el-form :model="registerForm" :rules="rules" label-width="100px" class="register-form">
      <h2 class="title">学生注册</h2>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="registerForm.nickname" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="registerForm.grade" placeholder="请选择年级">
          <el-option v-for="grade in grades" :key="grade" :label="grade" :value="grade"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="registerForm.class" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="registerForm.pid" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">注册</el-button>
        <el-button @click="router.push('/login')">直接登陆</el-button>
        <el-button @click="router.push('/')">返回主页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import type { RegisterForm } from "@/types";
import Http from "@/utils/Http";
import ElMessage from "element-plus/lib/components/message/index.js";
import { reactive, ref } from "vue";

const registerLoading = ref(false);

const initRegisterForm: RegisterForm = {
  name: "张三",
  nickname: "张三啊",
  email: "zhangsan@163.com",
  password: "123456",
  grade: 20,
  class: "软件2001",
  pid: "20121222132",
};

const registerForm = reactive({ ...initRegisterForm })

const grades = ["18", "19", "20", "21", "22", "23", "24"];

const rules = ref({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
  ],
  nickname: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  grade: [{ required: true, message: "请选择年级", trigger: "change" }],
  class: [
    { required: true, message: "请输入班级", trigger: "blur" },
    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
  ],
  pid: [
    { required: true, message: "请输入学号", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
});

const submitForm = async () => {
  if (registerLoading.value) return;
  registerLoading.value = true;

  try {
    const student = await Http.post("/register", registerForm) as any;

    if (student) {
      Object.assign(registerForm, initRegisterForm);
      localStorage.setItem("userType", "student");
      localStorage.setItem("userId", student.studentId);
      router.push("/");
      ElMessage({
        message: '注册成功!',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '注册失败',
        type: 'error',
      })
    }
  } catch (error) {
    console.log(error);
    ElMessage({
      message: '注册失败',
      type: 'error',
    })
  } finally {
    registerLoading.value = false;
  }
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-form {
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
</style>
