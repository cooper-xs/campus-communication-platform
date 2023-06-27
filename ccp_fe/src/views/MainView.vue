<template>
  <el-container>
    <el-header class="header">
      <div class="logo">校园交流平台</div>
      <div class="user-actions">
        <el-button type="text" class="text-white" @click="login">登录</el-button>
        <el-button type="text" class="text-white" @click="logout">退出</el-button>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const login = () => {
  router.push('/login');
};

const logout = () => {
  router.push('/logout');
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
