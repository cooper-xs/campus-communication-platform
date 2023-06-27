<template>
  <div class="register-container">
    <h1>学生注册</h1>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px">
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
          <el-option
            v-for="grade in grades"
            :key="grade"
            :label="grade"
            :value="grade"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="registerForm.class" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="registerForm.studentId" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const registerForm = ref({
      name: "",
      nickname: "",
      email: "",
      password: "",
      grade: "",
      class: "",
      studentId: "",
    });

    const grades = ref(["18级", "19级", "20级", "21级", "22级", "23级", "24级"]);

    const rules = {
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
      studentId: [
        { required: true, message: "请输入学号", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],
    };

    const submitForm = (formName) => {
      console.log(registerForm.value);
      // 实现注册逻辑
    };

    return { registerForm, rules, grades, submitForm };
  },
};
</script>

<style>
.register-container {
  width: 400px;
  margin: 50px auto;
}
</style>
