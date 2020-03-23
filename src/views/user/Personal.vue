<template>
  <div class="layer layer-full oh">
    <div>
      <!-- 信息部分 -->
      <div class="block blockmb">
        <div class="people-header">
          <div class="people-header-bg">
            <img class="header-bg" :src="user.imageUrl" />
            <div class="people-bg-mask">
              <p class="favourite-count">获赞与被收藏4次</p>
            </div>
          </div>

          <div class="people-header-info">
            <div class="people-info">
              <a class="people-avatar">
                <img :src="user.imageUrl" />
              </a>
              <div class="people-name">
                <a>{{user.username}}</a>
              </div>
              <div class="people-funs">
                <router-link :to="`/userCollect?uid=${this.$route.query.uid}&type=0`">
                  关注
                  <u>{{user.userNum.anum}}</u>
                </router-link>
                <router-link :to="`/userCollect?uid=${this.$route.query.uid}&type=1`">
                  粉丝
                  <u>{{user.userNum.fnum}}</u>
                </router-link>
              </div>
              <div class="people-desc">暂无简介</div>
              <div class="people-action">
                <div class="people-edit">
                  <!-- <a target="_blank" class="people-edit-btn" href="/people/profile/edit/">编辑</a> -->
                </div>
              </div>
            </div>
          </div>
          <div class="reply-addpic header-bg-change"  v-if="false">
            <div class="header-bg-change-bg"></div>
            <el-upload
              class="upload-demo abtn-up dib header-bg-change-btn"
              id="reply-addpic-btn"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              v-if="false"
            >更换背景</el-upload>
            <div class="reply-normal dib gray ml8 l20"></div>
            <div class="reply-uploading dib loading3 dn"></div>
            <div class="reply-uperror dib ml8 l20 red dn"></div>
            <div class="reply-uploaded dib ml8 l20 dn"></div>
          </div>
        </div>
      </div>
      <!-- 相关信息 -->
      <div id="people-detail" data-userid="22854014" data-ismaster="true">
        <div id="dymnav" class="nav-wrap people-nav-wrap">
          <ul class="people-nav">
            <li :class="$route.path=='/state'?'nav-item nav-cur':'nav-item'">
              <router-link :to="`/state?uid=${$route.query.uid}`">
                <span>
                  <i class="el-icon-message-solid" style="color: #ffb3b4"></i> 动态
                </span>
                <u></u>
              </router-link>
            </li>
            <li :class="$route.path=='/album'?'nav-item nav-cur':'nav-item'">
              <router-link :to="`/album?uid=${$route.query.uid}`">
                <span>
                  <i class="el-icon-picture" style="color: #ffa5007d;"></i> 专辑
                </span>
                <u></u>
              </router-link>
            </li>
            <!-- <li :class="$route.path=='/123'?'nav-item nav-cur':'nav-item'">
              <router-link to="/">
                <span>
                  <i class="el-icon-tickets" style="color: #03a9f470"></i> 文章
                </span>
                <u></u>
              </router-link>
            </li>
            <li :class="$route.path=='/234'?'nav-item nav-cur':'nav-item'">
              <router-link to="/">
                <span>
                  <i class="el-icon-video-play" style="color:#ffb3b4"></i> 视频
                </span>
                <u></u>
              </router-link>
            </li> -->
            <li :class="$route.path=='/collect'?'nav-item nav-cur':'nav-item'">
              <router-link :to="`/collect?uid=${$route.query.uid}`">
                <span>
                  <i class="el-icon-coin" style="color:#ffa5007d"></i> 收藏
                </span>
                <u></u>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="detail-item my-loading" style="display: none;">
          <i class="loading"></i>
        </div>
        <div class="detail-item my-albums" style="display: none;">
          <div class="content-list">
            <ul class="detail-content-list" data-showpublish="true"></ul>
          </div>
          <div class="view-more">查看更多</div>
        </div>
        <div class="detail-item my-dynamic" style nomore="1">
          <div class="content-list">
            <!-- 视图开始 -->
            <router-view></router-view>
            <!-- 视图结束 -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { userMessage } from "@/api.js";

export default {
  data() {
    return {
      fileList: [],
      user: {
        imgurl:
          "http://192.168.200.129:80/group1/M00/00/00/wKjIgV4lo2SAfXL0AAC0XHfMSlY725.png",
        userNum: {
          anum: "9999+",
          fnum: "9999+"
        }
      }
    };
  },
  methods: {
    //查看基本信息
    async userMessage() {
      let { data: result } = await userMessage(this.$route.query.uid);
      if (result.code == "1") this.user = result.data;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  created() {
    this.userMessage();
  }
};
// 
window.onscroll = function() {
  //为了保证兼容性，这里取两个值，哪个有值取哪一个
  //scrollTop就是触发滚轮事件时滚轮的高度
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var lll = document.getElementById("dymnav");

  if(lll){
      var key = !!lll.className.match(new RegExp("(\\s|^)fixed(\\s|$)"));

  if (scrollTop > 800) {
    if (!key) {
      lll.className += " fixed";
    }
  } else {
    if (key) {
      lll.className = lll.className.replace(
        new RegExp("(\\s|^)fixed(\\s|$)"),
        " "
      );
    }
  }
  }
};
</script>

<style>
@import url("../../assets/user/personal.css");
</style>
<style >
.fixed {
  transition: all 0.5s linear;
  position: fixed;
  top: 20%;
  left: 66%;
  z-index: 999;
}
</style>