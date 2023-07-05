<template>
  <div class="flex justify-center w-full">
    <el-card class="p-10 mx-20 w-full">
      <el-table :data="topRequests" style="width: 100%">
        <el-table-column prop="requestId" label="请求 ID" width="90px"></el-table-column>
        <el-table-column prop="postId" label="帖子 ID" width="90px"></el-table-column>
        <el-table-column label="结束时间" width="270px">
          <template #default="{ row }">
            <el-date-picker v-model="row.endTime" type="datetime" :editable="false" :clearable="false"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="270px"></el-table-column>
        <el-table-column prop="userId" label="用户 ID"></el-table-column>
        <el-table-column prop="userType" label="用户类型"></el-table-column>
        <el-table-column prop="adminId" label="管理员 ID"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作" fixed="right" width="120px">
          <template #default="{ row }">
            <div class="flex flex-col justify-center items-center">
              <el-button v-if="row.state === 0" type="success" class="ml-3 mb-2"
                @click="reviewTopRequest(row, 1)">通过审批</el-button>
              <el-button v-if="row.state === 0" type="danger" @click="reviewTopRequest(row, 2)">未通过审批</el-button>
              <div v-if="row.state === 1">已通过</div>
              <div v-if="row.state === 2">未通过</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Http from '@/utils/Http';
import timeDiff from '@/utils/timeDiff';
import timeUsual from '@/utils/timeUsual';
import { onMounted, ref } from 'vue';

const props = defineProps({
  userType: {
    type: String,
  },
  userId: {
    type: String,
  },
  nickName: {
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
  },
  verifyStatus: {
    type: Number,
  }
})

const topRequests = ref([]);

onMounted(() => {
  fetchTopRequests();
});

const fetchTopRequests = async () => {
  const res = await Http.get('/getTopRequests') as any;
  topRequests.value = res;
  topRequests.value.forEach((request: any) => {
    request.creationTime = timeUsual(request.creationTime.toString()) +
      " (" + timeDiff(request.creationTime.toString()) + ")"
  });
};

const reviewTopRequest = async (row: any, flag: number) => {
  console.log(row.endTime);
  const res = await Http.post('/reviewTopRequest', {
    requestId: row.requestId,
    adminId: props.admin?.adminId,
    endTime: row.endTime,
    state: flag,
  });
  if (res) {
    fetchTopRequests();
  }
};

</script>
