<template>
  <el-container class="not-found-page">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="24">
        <h1>404 - Not Found</h1>
        <p>抱歉，你正在查找的页面不存在。</p>
        <el-button type="primary" @click="router.push('/')">返回主页</el-button>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style scoped>
.not-found-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.row-bg {
  height: 100%;
}
</style>
