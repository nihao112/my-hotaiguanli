<template>
  <div>
    <div class="user">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover"
                   class="mgb2"
                   style="height:252px;">
            <div class="user-info">
              <img :src="store.getters.userInfo.avatar"
                   class="user-avator"
                   alt />
              <div class="user-info-cont">
                <div class="user-info-name">{{ store.getters.userInfo.username }}</div>
                <div>{{ store.getters.userInfo.username=== 'super-admin' ? $t('profile.SuperAdmin') : $t('profile.domestic') }}</div>
              </div>
            </div>
            <div class="user-info-list">
              {{$t("profile.userInfolist")}}
              <span>2021-11-01</span>
            </div>
            <div class="user-info-list">
              {{$t("profile.userInfosite")}}
              <span>{{$t("profile.Peking")}}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-row :gutter="20"
                  class="mgb20">
            <el-col :span="8">
              <el-card shadow="hover"
                       :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-1">
                  <div class="grid-con-icon">
                    <svg-icon icon="user"
                              className="icons"></svg-icon>
                  </div>
                  <div class="grid-cont-right">
                    <div class="grid-num">1234</div>
                    <div>{{$t("profile.Peking")}}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover"
                       :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-2">
                  <div class="grid-con-icon">
                    <svg-icon icon="dashboard"
                              className="icons"></svg-icon>
                  </div>
                  <div class="grid-cont-right">
                    <div class="grid-num">321</div>
                    <div>{{$t("profile.systemMessages")}}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover"
                       :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-3">
                  <div class="grid-con-icon">
                    <svg-icon icon="personnel"
                              className="icons"></svg-icon>
                  </div>
                  <div class="grid-cont-right">
                    <div class="grid-num">5000</div>
                    <div>{{$t("profile.quantity")}}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div ref="main"
               style="width: 600px;height:300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover"
                 style='overflow: hidden; height:340px;'>
          <div ref="maina"
               style="width: 600px;height:353px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script setup>
import userMounted, { main, maina } from './hooks/echarts'
import { useStore } from 'vuex'
userMounted()
const store = useStore()

</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  display: flex;
  div {
    margin: 0px 10px;
  }
}
.user {
  margin: 0px 0px 20px 0px;
  overflow: hidden;
}
.mgb20 {
  padding: 70px 0px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 130px;
  color: #fff;
  .icons {
    font-size: 40px;
  }
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
  .user-info-name {
    padding: 10px 0px;
  }
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}
</style>
