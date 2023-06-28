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
      <!-- <el-upload action="http://yourserver.com/upload" accept="video/*" :on-success="handleUploadSuccess"
        :on-error="handleUploadError">
        <el-button size="medium" type="primary">点击上传</el-button>
      </el-upload> -->
      <el-upload class="" drag action="/api/upload" multiple :on-success="handleUploadSuccess"
        :on-error="handleUploadError">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            仅允许上传MP4文件
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { NewActivityForm } from '@/types';
import { reactive, ref } from 'vue';

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

const handleUploadSuccess = (response: any, file: File, fileList: File[]) => {
  form.videoPath = response.data.url; // 假设服务器在响应中返回了视频的路径
  console.log('上传成功：', file);
};

const handleUploadError = (err: any, file: File, fileList: File[]) => {
  console.error('上传失败：', err);
};
</script>