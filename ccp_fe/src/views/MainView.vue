<template>
  <el-container>
    <el-header class="header">
      <div class="logo">校园交流平台</div>
      <div v-if="userType" class="user-info">
        <el-button v-if="student.studentId" type="text" class="text-white mr-4" @click="router.push('/')">{{ student.name
        }} 同学</el-button>
        <el-button v-if="teacher.teacherId" type="text" class="text-white mr-4" @click="router.push('/')">{{ teacher.name
        }} 老师</el-button>
        <el-button v-if="admin.adminId" type="text" class="text-white mr-4" @click="router.push('/')">{{ student.nickName
        }}</el-button>
        <el-button type="text" class="text-white" @click="logout">退出</el-button>
      </div>
      <div v-else class="user-actions">
        <el-button type="text" class="text-white" @click="login">登录</el-button>
      </div>
    </el-header>

    <!-- <el-container>
      <el-aside class="aside">
        <el-menu :default-active="1" @select="handleMenuSelect">
          <el-menu-item index="/activities">
            <i class="el-icon-date"></i>
            <span>活动</span>
          </el-menu-item>
          <el-menu-item index="/posts">
            <i class="el-icon-document"></i>
            <span>帖子</span>
          </el-menu-item>
        </el-menu>
      </el-aside> -->
    <el-container>
      <el-aside class="aside">
        <el-menu :default-active="2" :default-openeds="['1', '2']" @select="handleMenuSelect">

          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>帖子</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/posts/list">
                <el-icon>
                  <List />
                </el-icon>
                <span>帖子列表</span>
              </el-menu-item>
              <el-menu-item index="/posts/publish">
                <el-icon>
                  <Plus />
                </el-icon>
                <span>添加帖子</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Guide />
              </el-icon>
              <span>活动</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/activities">
                <el-icon>
                  <List />
                </el-icon>
                <span>活动列表</span>
              </el-menu-item>
              <el-menu-item v-if="teacher || admin" index="/addActivity">
                <el-icon>
                  <Plus />
                </el-icon>
                <span>添加活动</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>个人信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/profile/manage">
                <el-icon>
                  <View />
                </el-icon>
                <span>个人信息管理</span>
              </el-menu-item>
              <el-menu-item index="/profile/verify">
                <el-icon>
                  <CircleCheck />
                </el-icon>
                <span>实名认证</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/students">

                <span>学生管理</span>
              </el-menu-item>
              <el-menu-item index="/manage/teachers">

                <span>老师管理</span>
              </el-menu-item>
              <el-menu-item index="/manage/admins">

                <span>管理员管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view :userType="userType" :student="student" :teacher="teacher" :admin="admin"></router-view>
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
  academy: '',
  grade: 0,
  class: '',
  pid: '',
  verified: 0,
})

const teacher = ref({
  teacherId: '',
  nickName: '',
  name: '',
  email: '',
  password: '',
  academy: '',
  pid: '',
  verified: 0,
})

const admin = ref({
  adminId: '',
  name: '',
  email: '',
  password: '',
})

onMounted(async () => {
  userType.value = localStorage.getItem('userType') || '';
  if (userType.value === 'student') {
    student.value.studentId = localStorage.getItem('userId') || '';
    student.value = await Http.get('/getStudentById', { params: { studentId: student.value.studentId } });
    console.log(student.value);
  } else if (userType.value === 'teacher') {
    teacher.value.teacherId = localStorage.getItem('userId') || '';
    teacher.value = await Http.get('/getTeacherById', { params: { teacherId: teacher.value.teacherId } });
    console.log(teacher.value);
  } else if (userType.value === 'admin') {
    admin.value.adminId = localStorage.getItem('userId') || '';
    admin.value = await Http.get('/getAdminById', { params: { adminId: admin.value.adminId } });
    console.log(admin.value);
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

function handleMenuSelect(index: string) {
  router.push('/home' + index);
}
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
