<template>
  <el-form ref="form" v-model="form" label-width="120px">
    <el-form-item label="活动标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="活动描述">
      <el-input v-model="form.description" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-date-picker v-model="form.beginTime" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker v-model="form.beginTime" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="上传视频">
      
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { NewActivityForm } from '@/types';
import { reactive } from 'vue';

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

const initActivityForm: NewActivityForm = {
  title: '',
  description: '',
  videoPath: '',
  beginTime: new Date(),
  endTime: new Date(),
};

const form = reactive({ ...initActivityForm })

const onSubmit = () => {
  console.log('活动信息：', form);
};

</script>