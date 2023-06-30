<template>
  <div v-if="loading">
    <el-empty description="加载中" />
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <!-- 活动标题 -->
    <h1 class="text-center mb-10">{{ activityTitle }}</h1>
    <el-table :data="registrations" style="width: 80%" height="700">
      <el-table-column prop="registrationId" label="序号"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="studentId" label="学号"></el-table-column>
      <el-table-column prop="registrationTime" label="报名时间"></el-table-column>
      <!-- <el-table-column prop="state" label="报名状态"></el-table-column> -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :disabled="row.state === 1" @click="reviewRegistration(row, 1)">{{ row.state === 1 ?
            "已" : "" }}批准</el-button>
          <el-button type="danger" :disabled="row.state === 2" @click="reviewRegistration(row, 2)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';

const route = useRoute();
const activityId = ref('');
const registrations = ref([{
  registrationId: '',
  studentId: '',
  studentName: '',
  registrationTime: '',
  state: 0,
}]);
const loading = ref(true);
const activityTitle = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    activityId.value = route.params.activityId as string;
    const activity = await Http.get(`/getActivity`, { params: { activityId: activityId.value } }) as any;
    activityTitle.value = activity.title;
    const res = await Http.get(`/getRegistrations`, { params: { activityId: activityId.value } }) as any[];
    // console.log('报名情况请求结果', res);
    registrations.value = res;
    res.forEach(async (registration) => {
      const student = await Http.get('/getStudentById', { params: { studentId: registration.studentId } }) as any;
      registration.studentName = student.name;
      registration.registrationTime = new Date(registration.registrationTime).toLocaleString();
    });
    // console.log('报名情况', registrations.value);
  } catch (err) {
    ElMessage.error('获取报名信息失败');
  } finally {
    loading.value = false;
  }
});

const reviewRegistration = async (row: any, state: number) => {
  try {
    const res = await Http.post('/reviewRegistration', {
      registrationId: row.registrationId,
      state,
    }) as any;
    // console.log('批准报名请求结果', res);
    ElMessage.success('改动成功');
    row.state = state;
  } catch (err) {
    ElMessage.error('改动失败');
  }
};
</script>

<style scoped>
.approve-registrations {
  margin: 20px;
}
</style>
