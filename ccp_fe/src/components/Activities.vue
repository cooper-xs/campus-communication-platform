<template>
  <el-container>
    <el-header>
      <h2 class="text-lg">活动列表</h2>
    </el-header>
    <el-main>
      <el-table :data="activities" style="width: 100%">
        <el-table-column prop="title" label="活动名称"></el-table-column>
        <el-table-column prop="description" label="活动描述"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="flex flex-col ml-3">
              <el-button size="mini" @click="viewActivity(row.activityId)">查看详情</el-button>
              <el-button v-if="userType === 'student'" size="mini" @click="signUpActivity(row.activityId)">报名</el-button>
              <el-button v-if="userType === 'teacher' || userType === 'admin'" size="mini"
                @click="publishActivity(row.activityId)">发布活动</el-button>
              <el-button v-if="userType === 'teacher' || userType === 'admin'" size="mini"
                @click="approveActivity(row.activityId)">批准报名</el-button>
              <el-button v-if="userType === 'teacher' || userType === 'admin'" size="mini"
                @click="editActivity(row.activityId)">修改活动</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Http from "@/utils/Http";
import router from "@/router";
import timeFormat from '../utils/timeFormat'

const activities = ref([]);
const userType = ref('');


onMounted(async () => {
  userType.value = localStorage.getItem('userType') || '';
  activities.value = await Http.get("/getActivities");
  activities.value.forEach((activity: any) => {
    activity.creationTime = timeFormat(activity.creationTime);
    activity.beginTime = timeFormat(activity.beginTime);
    activity.endTime = timeFormat(activity.endTime);
  });
  console.log(activities.value);
});

const viewActivity = (id: number) => {
  router.push(`/home/activity/${id}`);
};

const signUpActivity = (id: number) => {
  // 这里你可能需要调用报名的API
}

const publishActivity = (id: number) => {
  router.push(`/home/addActivity`);
}

const approveActivity = (id: number) => {
  // 这里你可能需要调用批准报名的API
}

const editActivity = (id: number) => {
  // 这里你可能需要调用修改活动的API
}
</script>

<style scoped>
h2 {
  color: #333;
  padding: 0.5rem 0;
}
</style>
