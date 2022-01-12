<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})
const userData = computed(() => {
  return props.userData
})
</script>

<template>
  <div class="userinit">
    <!-- 标题 -->
    <h2 class="h2">{{ $t('userInfo.title') }}</h2>
    <!-- 头部渲染 -->
    <div class="header">
      <!-- 头部数据 -->
      <el-descriptions :column="2"
                       border>
        <el-descriptions-item :label="$t('userInfo.name')">{{
          userData.username
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.sex')">{{
          userData.gender
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.nation')">{{
          userData.nationality
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.mobile')">{{
          userData.mobile
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.province')">{{
          userData.address
        }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.date')">{{
        $filters.dateFilter(userData.openTime)
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.remark')">
          <el-tag v-for="(tag,index) in userData.remark"
                  :key="index"
                  class="remark"
                  size="mini">{{tag}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <!-- 头像 -->
      <el-image class="avatar"
                :src="userData.avatar"
                :preview-src-list="[userData.avatar]"></el-image>
    </div>
    <!-- 主体 -->
    <div class="body">
      <el-descriptions :column="1"
                       border>
        <el-descriptions-item :label="$t('userInfo.experience')">
          <ul>
            <li v-for="(item,index) in userData.experience"
                :key="index">
              <span>{{$filters.dateFilter(item.startTime,"YYYY-MM")}}----{{$filters.dateFilter(item.endTime,"YYYY-MM")}}</span>
              <span>&nbsp;&nbsp; {{item.title}}</span>
              <span>&nbsp;&nbsp; {{item.desc}}</span>
            </li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.major')"><span class="font">{{
          userData.major
        }}</span> </el-descriptions-item>
        <el-descriptions-item :label="$t('userInfo.glory')"> <span class="font">{{
          userData.glory
        }}</span></el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 尾部 -->
    <div class="footer">{{ $t('userInfo.foot') }}</div>
  </div>
</template>

<style lang="scss" scoped>
.userinit {
  .h2 {
    text-align: center;
    margin-bottom: 18px;
    font-size: 20px;
  }
  .header {
    display: flex;
    :deep(.el-descriptions) {
      flex: 1;
    }
    .avatar {
      width: 210px;
      height: 210px;
      box-sizing: border-box;
      padding: 20px 30px;
      border: 1px solid #ccc;
      border-left: none;
    }
    .remark {
      margin-left: 12px;
    }
  }
  .body {
    .font {
      font-size: 12px;
    }
    ul {
      list-style: none;

      li span {
        margin-left: 60px;
        font-size: 12px;
      }
    }
  }
  .footer {
    margin-top: 40px;
    text-align: right;
  }
}
</style>
