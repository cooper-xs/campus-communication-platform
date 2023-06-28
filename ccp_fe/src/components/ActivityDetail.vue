<template>
  <div class="flex flex-col p-4">
    <el-card class="mb-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold">{{ activity.title }}</span>
        <span>{{ activity.time }}</span>
      </div>
      <div v-if="activity.videoLink" class="aspect-w-16 aspect-h-9">
        <video controls>
          <source :src="activity.videoLink" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="mt-4">
        <p>{{ activity.description }}</p>
      </div>
    </el-card>
    <el-card>
      <div class="text-lg font-bold">
        视频
      </div>
      <div>
        <p>{{ activity.location }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Http from '@/utils/Http';
import router from '@/router';

const activity = ref({
  title: '',
  description: '',
  time: '',
  location: '',
  videoLink: '',
});

onMounted(async () => {
  const activityId = router.currentRoute.value.params.id;
  console.log(activityId);
  try {
    activity.value = await Http.get(`/getActivity`, { params : { activityId } });
  } catch (error) {
    console.error(error);
  }
});
</script>
