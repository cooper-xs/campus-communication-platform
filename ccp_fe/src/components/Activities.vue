<template>
  <el-container>
    <el-header class="flex flex-row justify-between">
      <h2 class="text-lg">活动列表</h2>
      <el-button v-if="userType === 'teacher' || userType === 'admin'" size="mini" type="primary" class="mr-5 my-auto"
        @click="publishActivity">发布活动</el-button>
    </el-header>
    <el-main class="flex justify-center">
      <el-table :data="activities" style="width: 80%" height="700">
        <el-table-column prop="title" label="活动名称" width="120">
          <template #default="{ row }">
            <el-button link size="small" class="p-2" type="primary" @click="viewActivity(row.activityId)">{{ row.title
            }}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="description" label="活动描述"></el-table-column> -->
        <el-table-column label="活动描述" min-width="300">
          <template #default="{ row }">
            <div class="description-ellipsis">{{ row.description.length > 90 ? row.description.substring(0, 88) + "......"
              : row.description }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="creationTime" label="创建时间"></el-table-column> -->
        <el-table-column prop="beginTime" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="120"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button v-if="userType === 'student'" link size="small" class="p-2" type="primary" @click="clickSignUp(row)">报名</el-button>

            <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
              link size="small" class="p-2" type="primary" @click="approveActivity(row.activityId)">批准报名</el-button>

            <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
              link size="small" class="p-2" type="primary" @click="editActivity(row.activityId)">修改活动</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>

  <el-dialog v-model="dialogVisible" title="报名活动" width="30%" :before-close="handleClose" :z-index="1000">
    <span>您确定要参加活动: {{ selectedActivity.title }} ?</span>
    <el-table :data="personalInfo" style="width: 100%">
      <el-table-column prop="item" label="" width="120"></el-table-column>
      <el-table-column label="">
        <template #default="{ row }">
          <el-input v-model="row.info"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消报名</el-button>
        <el-button type="primary" @click="signUpActivity()">
          报名
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Http from "@/utils/Http";
import router from "@/router";
import timeDiff from '../utils/timeDiff'
import { ElMessage, ElMessageBox } from "element-plus/lib/components/index.js";

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
  }
})
const activities = ref([]);
const dialogVisible = ref(false);
const selectedActivity = ref({} as any);
const personalInfo = ref([
  { item: "姓名", info: props.student?.name },
  { item: "学号", info: props.student?.pid },
  // { item: "年级", info: props.student?.grade },
  // { item: "学院", info: props.student?.academy },
  // { item: "班级", info: props.student?.class },
  // { item: "邮箱", info: props.student?.email },
  // { item: "电话", info: '' },
]);

onMounted(async () => {
  activities.value = await Http.get("/getActivities");
  activities.value.forEach((activity: any) => {
    activity.creationTime = timeDiff(activity.creationTime);
    activity.beginTime = timeDiff(activity.beginTime);
    activity.endTime = timeDiff(activity.endTime);
  });
});

const viewActivity = async (id: number) => {
  router.push(`/home/activity/${id}`);
};

const clickSignUp = async (row: any) => {
  // dialogVisible = true, selectedActivity = row
  if (!props.student) {
    ElMessage.error('请先登录')
    return;
  }
  if (props.student.verified !== 1) {
    ElMessage.error('请前往个人中心进行学生认证')
    return;
  }
  const signUpflag = await Http.get('/getSignUpFlag', {
    params: {
      activityId: row.activityId,
      studentId: props.student?.studentId,
    }
  })
  if (signUpflag) {
    ElMessage.info('您已经报名过该活动')
    return;
  }
  dialogVisible.value = true;
  selectedActivity.value = row;
};

const signUpActivity = async () => {
  personalInfo.value.forEach((info: any) => {
    if (info.info === '') {
      ElMessageBox.alert('请填写完整信息', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          dialogVisible.value = true;
        }
      });
    }
  })
  const res = await Http.post('/signUpActivity', {
    activityId: selectedActivity.value.activityId,
    studentId: props.student?.studentId,
  })
  if (res) {
    ElMessage.success('报名成功')
    dialogVisible.value = false
  } else {
    ElMessage.error('报名失败')
  }
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('报名信息将不会被保存, 确定取消报名?', { confirmButtonText: '取消报名', cancelButtonText: '返回', })
    .then(() => {
      done()
      dialogVisible.value = false
    })
}

const publishActivity = () => {
  router.push(`/home/addActivity`);
}

const approveActivity = (activityId: number) => {
  router.push(`/home/approveRegistraions/${activityId}`);
}

const editActivity = (activityId: number) => {
  router.push(`/home/editActivity/${activityId}`);
}
</script>

<style scoped>
h2 {
  color: #333;
  padding: 0.5rem 0;
}
</style>
