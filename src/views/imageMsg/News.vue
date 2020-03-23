<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:120px 0 30px 0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>消息</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="newsList">
      <div v-for="(v,i) in reviewList" :key="i">
        <el-row>
          <!-- 头像 -->
          <el-col :span="2">
            <router-link :to="`/state?uid=${v.user.uid}`">
              <el-avatar :src="v.user.imageUrl"></el-avatar>
            </router-link>
          </el-col>
          <!-- 网名 -->
          <el-col :span="22">
            <div style="margin-top:5px"></div>
            <router-link :to="`/state?uid=${v.user.uid}`">
            <h5>{{v.user.username}}</h5>
            </router-link>
            <p>{{new Date(v.infoTime).toLocaleString()}}</p>
          </el-col>
        </el-row>
        <!-- 评论 -->
        <div style="margin:10px 0;font-size:16px">
          回复我:
          <span style="font-weight:700">{{v.info}}</span>
        </div>
        <!-- 图片集信息 -->
        <router-link :to="`/imageMsg?imgId=${v.img.iid}`" v-if="v.img">
          <div style="background-color:#f8f8f8">
            <img
              :src="v.img.dataurl.split(',')[0]"
              :alt="v.img.info"
              style="width:100px;height:100px;vertical-align: text-top;"
            />
            <span style="padding: 20px;position: absolute;">by 图片集：{{v.img.info}}</span>
          </div>
        </router-link>
        <div v-else><i class="el-icon-warning-outline"></i>该图片集已删除~</div>
      </div>
    </div>

    <div v-if="reviewList.length==0" class="news_not">暂无消息~</div>
  </div>
</template>

<script>
import { lookUnreadReviewMsg } from "@/api.js";
export default {
  data() {
    return {
      reviewList: []
    };
  },
  methods: {
    async lookUnreadReviewMsg() {
      let { data: result } = await lookUnreadReviewMsg();

      if (result.code == 1) {
        this.reviewList = result.data;
      } else {
        this.$message.error(result.message);
        this.$router.push("/");
      }
    }
  },
  created() {
    this.lookUnreadReviewMsg();
  }
};
</script>

<style>
.news_not {
  border: #a1a1a1 1px solid;
  padding: 200px 0 350px 0;
  text-align: center;
  font-size: 20px;
}

.newsList > div {
  border: #adbabd 1px solid;
  padding: 10px 20px;
  margin-bottom: 20px;
  box-shadow: #a1a1a1 10px 10px 14px -9px;
}
.newsList .el-avatar {
  margin-right: 20px !important;
  vertical-align: text-top;
}
.newsList p {
  padding: 0;
  margin: 0;
}
</style>