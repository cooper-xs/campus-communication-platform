<template>
  <el-form v-model="activityForm" label-width="120px">
    <el-form-item label="活动标题">
      <el-input v-model="activityForm.title" maxlength="10" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="活动描述">
      <el-input v-model="activityForm.description" type="textarea" :rows="4" maxlength="200" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-date-picker v-model="activityForm.beginTime" type="datetime" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker v-model="activityForm.endTime" type="datetime" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import router from '@/router';
import type { NewActivityForm } from '@/types';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';
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

const activityForm = reactive({ ...initActivityForm })

const onSubmit = async () => {
  if(!props.teacher) {
    ElMessage.error('请先登录');
    return;
  }
  const activityParams = {
    teacherId: props.teacher.teacherId,
    ...activityForm,
  }
  const res = await Http.post('/addActivity', activityParams);
  if(res) {
    ElMessage.success('添加成功');
    router.push('/home/activities');
  }
};

</script>