<template>
  <el-container>
    <el-header>
      <h2 class="text-lg">活动列表</h2>
      <el-button v-if="userType === 'teacher' || userType === 'admin'" size="mini"
        @click="publishActivity">发布活动</el-button>
    </el-header>
    <el-main>
      <el-table :data="activities" style="width: 100%" height="700">
        <el-table-column prop="title" label="活动名称" width="120">
          <template #default="{ row }">
            <el-button link size="small" class="p-2" type="primary" @click="signUpActivity(row.activityId)">{{ row.title }}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="description" label="活动描述"></el-table-column> -->
        <el-table-column label="活动描述">
          <template #default="{ row }">
            <div class="description-ellipsis">{{ row.description.length > 100 ? row.description.substring(0, 98) + "......"
              : row.description }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="creationTime" label="创建时间"></el-table-column> -->
        <el-table-column prop="beginTime" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <!-- <el-button link size="small" class="p-2" type="primary" @click="viewActivity(row.activityId)">查看详情</el-button> -->

            <el-button v-if="userType === 'student'" link size="small" class="p-2"
              @click="signUpActivity(row.activityId)">报名</el-button>

            <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
              link size="small" class="p-2" type="primary" @click="approveActivity(row.activityId)">批准报名</el-button>

            <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
              link size="small" class="p-2" type="primary" @click="editActivity(row.activityId)">修改活动</el-button>

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
import timeDiff from '../utils/timeDiff'

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
const activities = ref([]);

onMounted(async () => {
  activities.value = await Http.get("/getActivities");
  activities.value.forEach((activity: any) => {
    activity.creationTime = timeDiff(activity.creationTime);
    activity.beginTime = timeDiff(activity.beginTime);
    activity.endTime = timeDiff(activity.endTime);
  });
  console.log(activities.value);
});

const viewActivity = (id: number) => {
  router.push(`/home/activity/${id}`);
};

const signUpActivity = (id: number) => {
  // 这里你可能需要调用报名的API
}

const publishActivity = () => {
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
