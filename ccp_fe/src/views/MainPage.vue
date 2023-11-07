<template>
  <div class="">
    <el-container class="">
      <el-header class="bg-green-300 h-100px">
        头部
      </el-header>
      <el-container class="el-container-main">
        <el-aside class="bg-red-300 w-3/10">Aside</el-aside>
        <el-main class="bg-blue-300 w-2/5">
          <el-button @click="updateWidth">收起侧边</el-button>
          <div v-for="item in messageQueue" :key="item.time">
            <p>
              {{ item.content }}
            </p>
          </div>
        </el-main>
        <el-aside class="right-side bg-red-300" :width="rightSideWidth">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const rightSideWidth = ref('3/10')
const rightSideFlag = ref(false)

interface myMessage {
  type: string,
  content: string,
  time: string
}

const messageQueue = ref<myMessage[]>([])

onMounted(() => {
  // signConnect()
})

function signConnect() {
  setInterval(async () => {
    const res = await fetchMessage();
    if(res === 'success') {
      messageQueue.value.push({
        type: 'success',
        content: '连接成功',
        time: new Date().toLocaleString()
      })
    }
  }, 1000)
}

function fetchMessage() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 100)
  }, )
}

function updateWidth() {
  console.log(rightSideWidth.value)
  if(rightSideFlag.value) {
    rightSideWidth.value = '20px'
    rightSideFlag.value = false
  } else {
    rightSideWidth.value = window.innerWidth * 0.3 + 'px'
    rightSideFlag.value = true
  }
}
</script>

<style scoped>
.right-side {
  transition: width 0.3s ease;
}

.el-container-main {
  height: calc(100vh - 100px);
}
</style>