<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="@/assets/zzz.jpeg" style="width:100%;height:100%" alt="">
      </el-carousel-item>
    </el-carousel>
    <br />
    <br />
    <br />

        <div style="margin-top: 20px">
        <el-radio-group v-model="menu" size="medium">
        <el-radio-button :label="menuList[0].path" >{{menuList[0].name}}</el-radio-button>
        </el-radio-group>
        </div>

    <!-- 动态 -->
    <div class="dt-content">
          <div class="main-list-content">
      <div class="left-content">
        <!-- 左侧栏 -->
        <div class="content-tabs">
          <ul>
            <li class="selection active">每日精选</li>
            <li class="attention">
              <!-- 关注动态 -->
              <span></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 中间栏 -->
      <div class="content-list selection-detail" locked="1" nomore="1">
        <div class="my-loading" style="display: none;">
          <i class="loading"></i>
        </div>
        <!-- 中间栏结束 -->
  
        <div class="content-detail">

          <!-- 内容 -->
          <router-view></router-view>

        </div>
      </div>
      <!-- 右部 -->
      <div class="right-content">
        <div class="dt-daren">
          <h3>制作组</h3>
          <span class="change-daren">_(:з」∠)_</span>
          <ul class="dt-daren-list">
            <div class="section">
              <div class="daren-img">
                <a>
                  <img
                    class="daren-avatar"
                    src="http://img.redyu.run/FnqgIWWln0VaGXEYrsvEr4whxLcy"
                  />
                  <img
                    class="daren-avatar-v"
                    src="@/assets/v.png"
                  />
                </a>
              </div>
              <div class="daren-desc">
                <a target="_blank" class="daren-title">aliary</a>
                <p class="daren-expertise">
                  擅长领域:
                  <b>摄影</b>
                </p>
              </div>
              <a class="daren-follow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=207798583&site=qq&menu=yes" data-userid="53371">联系</a>
            </div>
            <div class="section" data-id="kwayL">
              <div class="daren-img">
                <a target="_blank" href="/people/?user_id=1060109">
                  <img
                    class="daren-avatar"
                    src="http://img.redyu.run/FkBJeGxTup7yyQUCi6F0e5fFbTpr"
                  />
                  <img
                    class="daren-avatar-v"
                    src="@/assets/v.png"
                  />
                </a>
              </div>
              <div class="daren-desc">
                <a target="_blank" class="daren-title">kwayL</a>
                <p class="daren-expertise">
                  擅长领域:
                  <b>插画</b>
                </p>
              </div>
              <a class="daren-follow" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2235200496&site=qq&menu=yes" data-userid="1060109">联系</a>
            </div>
          </ul>
          <a
            class="dt-daren-more"
            target="_blank"
            href="http://jq.qq.com/?_wv=1027&k=5C7Xqu2"
          >
            加入我们
            <i></i>
          </a>
        </div>
      </div>
      <!-- 右边结束 -->
    </div>
    <!-- 内容结束 -->
    </div>
  
  </div>
</template>

<script>
import {selectAllMenuList} from '@/api.js'
export default {
  data() {
    return {
      tabPosition: "left",
      menuList:[
        {
          path:'',
          name:''
        }
      ],
      menu:'/jx_image',
      key:false
    };
  },
  methods: {
    async selectMenuList(){
      let {data : result} = await selectAllMenuList();
      this.menuList = result.data
    },

  },
  created(){
    this.selectMenuList()
  },
  watch:{
    menu:{
      deep:true,
      handler(ele){
        this.$router.push(ele)
      }
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  width: 100%;
}
.main-list-content {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
.main-list-content .left-content {
  /* width: 760px; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

.main-list-content .left-content .content-tabs {
  width: 160px;
}

dl,
ul {
  list-style: none;
}

.main-list-content .left-content .content-tabs li.active {
  background: #faeded;
  color: #ff7e7e;
}
.main-list-content .left-content .content-tabs li {
  padding: 18px 23px;
  position: relative;
  font-size: 14px;
  cursor: pointer;
}
li {
  vertical-align: middle;
}

.main-list-content .left-content .content-list {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.main-list-content .left-content i.loading {
  clear: both;
  zoom: 1;
  padding: 0 0 56px;
  margin: 0 0 16px;
  background-image: url("../../assets/loading.gif");
  background-repeat: no-repeat;
  background-position: center 16px;
}

.main-list-content .left-content .loading {
  display: inline-block;
  position: relative;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 30px;
}
.main-list-content .loading {
  display: inline-block;
  position: relative;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 30px;
}
.dt-wrap i {
  display: inline-block;
  background-image: url("../../assets/utils.png");
  background-repeat: no-repeat;
}
.loading {
  clear: both;
  zoom: 1;
  padding: 0 0 56px;
  margin: 0 0 16px;
  background-image: url("../../assets/loading.gif");
  background-repeat: no-repeat;
  background-position: center 16px;
}
.dt-content {
  margin-top: 40px;
}

.dynamic-feed-item {
  width: 600px;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
}

.dynamic-feed-item .feed-container {
  padding: 20px;
  font-size: 0;
}

.dynamic-feed-item .user-info {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}

.dynamic-feed-item .dynamic-album-desc {
  max-width: 558px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 24px;
  color: #444;
  margin-top: 16px;
  margin-bottom: 10px;
}

.dynamic-feed-item .feed-container {
  padding: 20px;
  font-size: 0;
}

.dynamic-feed-item .dynamic-multi-img-container {
  width: 360px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  position: relative;
}

.dynamic-feed-item .dynamic-multi-img-container a.left-img {
  margin-left: 0;
}
.dynamic-feed-item .dynamic-multi-img-container a {
  display: inline-block;
  /* width: 100%; */
  font-size: 0;
  margin-bottom: 9px;
  margin-left: 9px;
}
.dynamic-feed-item .dynamic-multi-img-container a img {
  width: 114px;
  height: 114px;
  border-radius: 8px;
}

.de-action .action-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.de-action .action-list .one-action {
  margin: 10px 0;
  height: 44px;
  border-right: 1px solid #e0e0e0;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}

.de-action .action-list .one-action img {
  animation: zoom 0.3s ease;
  -webkit-animation: zoom 0.3s ease;
  width: 24px;
  height: 24px;
  display: block;
  margin-right: 12px;
}
.de-action .action-list .one-action span {
  font-size: 16px;
}
.de-action .action-list .one-action:last-child {
  border: none;
}
.de-action .more-action-list {
  height: 0;
  position: absolute;
  top: 75px;
  right: 0;
  width: 172px;
  -webkit-box-shadow: 0 2px 3px 0 rgba(214, 214, 214, 0.5);
  box-shadow: 0 2px 3px 0 rgba(214, 214, 214, 0.5);
  background-color: #fff;
  display: none;
  border: 1px solid #e0e0e0;
  z-index: 10;
}
.de-action .more-action-list ul li {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -moz-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 20px;
  height: 46px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}
li {
  vertical-align: middle;
}
.de-action .more-action-list ul li:last-child {
  border: none;
}
.dynamic-feed-item .user-info .avatar {
  -webkit-flex-basis: 50px;
  -ms-flex-preferred-size: 50px;
  flex-basis: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.dynamic-feed-item .user-info .user-desc {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-left: 8px;
}
.dynamic-feed-item .user-info .user-desc .publish-time {
  color: #aaa;
  font-size: 16px;
  line-height: 22px;
}
.dynamic-feed-item .user-info .user-desc .username {
  display: inline-block;
  font-size: 18px;
  color: #444;
  line-height: 25px;
}
p,
pre,
td,
textarea,
th,
ul {
  margin: 0;
  /* padding: 0; */
}
/* 右部分*/
.main-list-content .right-content {
  margin-left: 20px;
  width: 220px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-flow: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-flow: column;
  flex-flow: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.dt-content .dt-daren {
  margin-bottom: 20px;
  position: relative;
  width: 218px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  color: #444;
}

.dt-content .dt-daren h3 {
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 600;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 14px;
  font-weight: 400;
}

.dt-content .dt-daren .change-daren {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 12px;
  color: #ff7e7e;
  cursor: pointer;
}

.dt-content .dt-daren .dt-daren-list {
  padding: 14px;
  border-top: 1px solid #e0e0e0;
}

.dt-content .dt-daren .dt-daren-list .section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 14px;
}

.dt-content .dt-daren .dt-daren-list .section .daren-img {
  position: relative;
  margin-right: 6px;
}
.dt-content .dt-daren .dt-daren-list .section .daren-img .daren-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.dt-content .dt-daren .dt-daren-list .section .daren-img .daren-avatar-v {
  position: absolute;
  left: 26px;
  top: 26px;
  width: 14px;
  height: 14px;
}
.dt-content .dt-daren .dt-daren-list .section .daren-desc {
  font-size: 0;
}
p, pre, td, textarea, th, ul {
    margin: 0;
    /* padding: 0; */
}
.dt-content .dt-daren .dt-daren-list .section .daren-desc .daren-title {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #444;
  font-size: 12px;
  font-weight: 700;
}
.dt-content .dt-daren .dt-daren-list .section .daren-desc .daren-expertise {
  width: 100px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
  font-size: 10px;
  color: #777;
}
.dt-content .dt-daren .dt-daren-list .section .daren-desc .daren-expertise b {
  font-weight: 600;
}
.dt-content .dt-daren .dt-daren-list .section .daren-follow {
    display: inline-block;
    width: 40px;
    height: 18px;
    background-color: #ff7e7e;
    border: 1px solid #ff7e7e;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
}
.main-list-content .right-content {
    margin-left: 20px;
    width: 220px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.dt-content .dt-daren .dt-daren-more {
    display: block;
    padding: 10px 0;
    text-align: center;
    font-size: 12px;
    color: #ff7e7e;
    border-top: 1px solid #e0e0e0;
}
.de-action .action-list .one-action:hover span {
    color: #ff7e7e;
}
.is-active .el-radio-button__inner{
  background-color: pink !important;
  border-color: pink !important;
  -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
.main-list-content .view-more {
    display: none;
    margin-top: 20px;
    border: 1px solid #ff7e7e;
    text-align: center;
    line-height: 64px;
    position: relative;
    color: #ff7e7e;
    font-size: 16px;
    cursor: pointer;
}
.main-list-content .view-more:hover{
  background-color: #fff5f5
}

.main-list-content .view-more::after {
    content: '';
    background-image: url('../../assets/20180509145151_U8L3m.png');
    background-size: 11px 7px;
    width: 11px;
    height: 7px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -4px;
    margin-left: 38px;
}
.content-list{
  width: 100%;
}
</style>