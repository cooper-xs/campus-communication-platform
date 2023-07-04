<template>
  <div v-if="loading">
    <el-empty description="加载中"></el-empty>
  </div>
  <div v-else class="flex justify-center items-center h-200">
    <el-card class="p-10 pr-30">
      <el-form v-model="activityForm" label-width="120px">
        <el-form-item label="活动标题">
          <el-input v-model="activityForm.title" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="activityForm.description" type="textarea" :rows="4" maxlength="400"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="activityForm.beginTime" type="datetime" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="activityForm.endTime" type="datetime" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickSubmitForm">提交</el-button>
          <el-button @click="toActivities">取消</el-button>
          <el-button v-if="activity.activityId" type="default"
            @click="$router.push(`/home/activity/${activity.activityId}`)">上传视频</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <el-dialog v-model="pushActivityDialogVisible" title="确定" width="30%">
    <span>确认发布?</span>
    <template #footer>
      <el-button @click="pushActivityDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="pushActivityDialogVisible = false, onSubmit()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import router from '@/router';
import type { NewActivityForm } from '@/types';
import Http from '@/utils/Http';
import ElMessage from 'element-plus/lib/components/message/index.js';
import { onMounted, reactive, ref } from 'vue';

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

const initActivityForm: NewActivityForm = {
  title: '',
  description: '',
  beginTime: null,
  endTime: null,
};

const activityForm = reactive({ ...initActivityForm })

const activity = ref({
  activityId: '',
  teacherId: '',
  title: '',
  description: '',
  beginTime: '',
  endTime: '',
  creationTime: '',
});
const loading = ref(false);
const pushActivityDialogVisible = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    if (router.currentRoute.value.path.startsWith('/home/editActivity')) {
      const activityId = router.currentRoute.value.params.activityId;
      activity.value = await Http.get(`/getActivity`, { params: { activityId } }) as any;
      activityForm.title = activity.value.title;
      activityForm.description = activity.value.description;
      activityForm.beginTime = new Date(activity.value.beginTime);
      activityForm.endTime = new Date(activity.value.endTime);
    }
  } catch {
    ElMessage.error('获取活动信息失败');
  } finally {
    loading.value = false;
  }
})

const onSubmit = async () => {
  const activityParams = {
    activityId: activity.value.activityId ?? '',
    teacherId: props.teacher!.teacherId,
    ...activityForm,
  }
  const res = await Http.post('/updateActivity', activityParams);
  if (res) {
    ElMessage.success('保存成功');
    router.push('/home/activities');
  } else {
    ElMessage.error('保存失败');
  }
};

const toActivities = () => {
  router.push('/home/activities');
}


const clickSubmitForm = () => {
  if (!props.teacher) {
    ElMessage.error('请先登录');
    return;
  }

  if (!activityForm.title || !activityForm.description || !activityForm.beginTime || !activityForm.endTime) {
    ElMessage.warning('您填写的活动信息不完整');
    return;
  }

  // 结束时间不能超过开始时间
  if (activityForm.endTime.getTime() < activityForm.beginTime.getTime()) {
    ElMessage.warning('结束时间不能超过开始时间!');
    return;
  }

  // 开始时间必须晚于当前时间
  if (activityForm.beginTime.getTime() < new Date().getTime()) {
    ElMessage.warning('开始时间必须晚于当前时间!');
    return;
  }

  pushActivityDialogVisible.value = true;
}
</script>