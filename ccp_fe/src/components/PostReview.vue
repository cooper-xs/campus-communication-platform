<!-- <template>
  <div>
    <el-table :data="posts" style="width: 80%" height="700">
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
          <el-button v-if="userType === 'student'" link size="small" class="p-2" type="primary"
            @click="clickSignUp(row)">报名</el-button>

          <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
            link size="small" class="p-2" type="primary" @click="approveActivity(row.activityId)">批准报名</el-button>

          <el-button v-if="(userType === 'teacher' && row.teacherId === teacher?.teacherId) || (userType === 'admin')"
            link size="small" class="p-2" type="primary" @click="editActivity(row.activityId)">修改活动</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Http from "@/utils/Http";
import type { post } from "@/types";

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

const posts = ref<post[]>()

const fetchPosts = async () => {
  // const userType = switchOnlyStudent.value ? 'student' : props.userType;
  // if (switchOnlyMe.value) {
  //   posts.value = await Http.get('/getPosts', { params: { userType, userId: props.userId } });
  // } else if (switchOnlyStudent.value) {
  //   posts.value = await Http.get('/getPosts', { params: { userType } });
  // } else {
  //   posts.value = await Http.get('/getPosts');
  // }
  // if (props.userType !== 'admin') {
  //   // 筛选未审核/审核不通过/草稿 且 不是自己的帖子
  //   posts.value = posts.value.filter(post => !(post.state !== 0 && post.state !== 2 && post.userId !== props.userId))
  // }

  posts.value = await Http.get('/getPosts');
  
}
</script> -->