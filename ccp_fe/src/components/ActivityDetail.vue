<template>
  <div class="flex flex-col items-center justify-center p-4">
    <el-card class="mb-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold">{{ activity.title }}</span>
        <span v-if="teacher?.teacherId === activity.teacherId" class="px-3">创建时间: {{ activity.creationTime }}</span>
      </div>
      <div class="flex justify-end items-center ">
        <span class="px-3">开始时间: {{ activity.beginTime }}</span>
        <span class="px-3">结束时间: {{ activity.endTime }}</span>
      </div>
      <div class="mt-4">
        <p>{{ activity.description }}</p>
      </div>
    </el-card>
    <el-card v-for="video in videos" :key="video.videoId"  class="w-lg mb-4">
      <div class="flex flex-col items-center justify-center">
        <video width="320" height="240" controls class="m-3">
          <source :src="video.videoPath" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <el-button type="danger">删除</el-button>
      </div>
    </el-card>
    <el-card v-if="teacher?.teacherId === activity.teacherId">
      <div class="text-lg font-bold">
        上传视频
      </div>
      <el-upload class="" drag action="/api/uploadMP4" multiple :on-success="handleUploadSuccess"
        :on-error="handleUploadError">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖动到这里 或者 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            仅允许上传H.264编码格式的MP4文件, 其他格式将不能正确播放
          </div>
        </template>
      </el-upload>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Http from '@/utils/Http';
import router from '@/router';
import timeUsual from '@/utils/timeUsual';
// import VideoPlayer from './VideoPlayer.vue';

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

const activity = ref({
  activityId: '',
  teacherId: '',
  title: '',
  description: '',
  beginTime: '',
  endTime: '',
  creationTime: '',
  // videoId: '',
});
const videos = ref([{
  videoId: '',
  teacherId: '',
  activityId: '',
  videoPath: '',
  creationTime: '',
}]);

onMounted(async () => {
  const activityId = router.currentRoute.value.params.id;
  try {
    activity.value = await Http.get(`/getActivity`, { params: { activityId } });
    activity.value.creationTime = timeUsual(activity.value.creationTime);
    activity.value.beginTime = timeUsual(activity.value.beginTime);
    activity.value.endTime = timeUsual(activity.value.endTime);

    videos.value = await Http.get('/getVideosByActivityId', { params: { activityId } });
    console.log(videos.value)
  } catch (error) {
    console.error(error);
  }
});

const handleUploadSuccess = async (response: any, file: File, fileList: File[]) => {
  // form.videoPath = response.data.urls[0];
  const videoParams = {
    teacherId: activity.value.teacherId,
    activityId: activity.value.activityId,
    videoPath: response.data.urls[0],
  };
  await Http.post('/addVideo', videoParams);
  videos.value = await Http.get('/getVideosByActivityId', { params: { activityId: activity.value.activityId } });
};

const handleUploadError = (err: any, file: File, fileList: File[]) => {
  console.error('上传失败：', err);
};
</script>
