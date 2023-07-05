<template>
  <div class="flex justify-center w-full">
    <el-card class="p-10 mx-20 w-full">
      <el-table :data="reviewList" width="90%">
        <el-table-column prop="reviewId" label="审核ID"></el-table-column>
        <el-table-column prop="postId" label="帖子ID"></el-table-column>
        <el-table-column prop="adminId" label="管理员ID"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="300px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Http from '@/utils/Http';
import timeDiff from '@/utils/timeDiff';
import timeUsual from '@/utils/timeUsual';
import { onMounted, ref } from 'vue';

const reviewList = ref([]);

onMounted(() => {
  fetchReviewList();
});

const fetchReviewList = async () => {
  const res = await Http.get('/getReviews') as any;
  reviewList.value = res;
  reviewList.value.forEach((review: any) => {
    // 审核形式：0-审核通过，1-审核不通过, 2-待审核
    review.status = review.status === 0 ? '通过审核' : '未通过审核';
    review.creationTime = timeUsual(review.creationTime.toString()) +
      " (" + timeDiff(review.creationTime.toString()) + ")"
  });
};
</script>