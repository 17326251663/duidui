<template>
  <div>
    <!-- 头部 -->
    <div class="album-header">
      <div class="album-header-bg">
        <h1 class="album-title">{{album.aname}}</h1>
        <p class="album-info">
          <span class="album-count">{{album.imageNum}}张图片</span>&nbsp;
          <b>·</b>&nbsp;
          <span class="like-count">
            <em>0</em>人收藏
          </span>
        </p>
        <a class="album-account">
          <img class="avatar" :src="album.user.imageUrl" />
          <span class="name">{{album.user.username}}</span>
        </a>
        <div class="album-desc"></div>
        <div class="update-time">~</div>
        <div class="album-action">
          <el-dropdown>
            <span class="el-dropdown-link">
              <a title="发布" id="album-post" class="album-post" href="javascript:;">
                <i class="el-icon-plus"></i>
                <span>分享</span>
              </a>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              <span @click="shareToQq(`堆堆社区专辑分享-${album.aname}-${album.user.username}`,'堆堆社区',`127.0.0.1/imageMsg?albumMsg%3D${$route.query.id}`,`${album.imgList[0].dataurl[0]}`)">分享至空间</span>
              </el-dropdown-item>
              <el-dropdown-item
                divided      
              ><span @click="shareToXl(`堆堆社区专辑分享-${album.aname}-${album.user.username}`,`127.0.0.1/imageMsg?albumMsg%3D${$route.query.id}`,`${album.imgList[0].dataurl[0]}`)">分享至微博</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <div id="album-share" class="album-share" href="javascript:;">
            <i class="el-icon-edit"></i>
            <span>编辑</span>
          </div>-->
        </div>
      </div>
    </div>
    <br />
    <!-- 图片 -->

    <div class="album-content">
      <div id="woo-holder">
        <a name="woo-anchor"></a>

        <div class="woo-swb woo-cur" style="display: block;">
          <div
            class="woo-tmpmasn woo-pcont stpics clr woo-masned"
            style="position:relative;height:0;overflow:hidden;margin:0;padding:0;"
          ></div>
          <div
            class="woo-pcont stpics clr woo-masned"
            data-wootemp="4"
            id="img_box"
            data-totalunits="2"
            style="    height: 1000px;
            position: relative;
            overflow: overlay;
            width: 1000px;
            visibility: visible;"
          >
            <!-- 资源图片 -->
            <div
              class="woo co0 album_img"
              :style=" `top: 0px; left: ${v.left}px;`"
              v-for="(v,i) in album.imgList"
              :key="i"
            >
              <div class="j">
                <div class="mbpho" style="height:233px;">
                  <router-link :to="`/imageMsg?imgId=${v.iid}`" class="a">
                    <img :alt="v.info" :src="v.dataurl[0]" height="233" />
                    <u style="margin-top:-233px;height:233px;" class></u>
                  </router-link>
                  <div
                    class="collbtn"
                    data-favorite="{&quot;id&quot;:1188483178,&quot;owner&quot;:22854014,&quot;type&quot;:&quot;1&quot;}"
                    style="position: absolute; left: 0px; bottom: 0px; display: none;"
                  >
                    <a class="y" href="javascript:;">
                      <span @click="collectImg(v)">收藏</span>
                    </a>
                    <!-- <a class="m" target="_blank" href="/blog/?id=1188483178"></a> -->
                    <a
                      class="z re-zan z-done"
                      data-like="{&quot;likeid&quot;: 0}"
                      href="javascript:;"
                    >已赞</a>
                    <a
                      class="x"
                      href="javascript:;"
                      style="margin: 0;"
                      @click="openReview(v.iid)"
                    >评论</a>
                  </div>
                  <i class="icon-like"></i>
                </div>
                <div class="wooscr">
                  <div class="g">{{v.info}}</div>
                </div>
              </div>
            </div>

            <!--  -->
            <div class="clearfloat"></div>
          </div>

          <!-- 分页条 -->
          <div class="woo-pager" style="height: auto;" id="q1">
            <div class="woo-pbr woo-mpbr">
              <ul class="woo-dib">
                <!-- <li class="woo-cur">1</li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <el-dialog title="评论" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <span>评论：</span>
      <el-input placeholder="请输入评论~" v-model="review.info" style="width:70%" size="mini"></el-input>
      <el-button size="mini" @click="addImgReview(0,album.user.uid)" type="danger">发送</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { AlbumMsgWithImg, collectImg, addImgReview } from "@/api.js";
export default {
  data() {
    return {
      album: {
        user: {}
      },
      left: 0,
      dialogVisible: false,
      review: {
        parentId: 0,
        imgId: 0,
        toUid: 1,
        info: ""
      }
    };
  },
  methods: {
    async AlbumMsgWithImg(id) {
      let { data: result } = await AlbumMsgWithImg(id);

      if (result.code == "1") {
        this.album = result.data;

        if (this.album.imgList.length != 0) {
          let left = 0;
          let col = 0;
          this.album.imgList.forEach(e => {
            e.dataurl = e.dataurl.split(",");
            this.album.imageNum = e.dataurl.length;
            e.left = left;
            left += 255;
            col += 1;
            if (col % 4 == 0) {
              left = 0;
            }
          });
        }
      }
    },

    setHeight() {
      let imgs = document.getElementsByClassName("album_img");
      for (let i = 0; i < imgs.length; i++) {
        if (i > 3) {
          let height = imgs[i - 4].offsetHeight;
          let top = imgs[i - 4].offsetTop;
          imgs[i].style.top = height + top + 15 + "px";
        }
        //   if(i==imgs.length)
      }
    },
    //收藏
    async collectImg(imgList) {
      let { data: result } = await collectImg(imgList.iid);
      if (result.code == 1) {
        this.$message.success(result.message);
      } else {
        this.$message.error(result.message);
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loginUser");
          location.reload();
        }
      }
    },
    //评论
    async addImgReview(parentId, toUid) {
      this.review.toUid = toUid;
      this.review.parentId = parentId;
      let { data: result } = await addImgReview(this.review);
      if (result.code == 1) {
        this.$message.success(result.message);
        this.dialogVisible = false;
        this.review.info = "";
      } else {
        this.$message.error(result.message);
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loginUser");
          location.reload();
        }
      }
    },
    //打开评论框
    openReview(imgId) {
      this.review.imgId = imgId;
      this.dialogVisible = true;
    },
    //分享
    //分享到新浪微博

    shareToXl(title, url, picurl) {
      var sharesinastring =
        "http://v.t.sina.com.cn/share/share.php?title=" +
        title +
        "&url=" +
        url +
        "&content=utf-8&sourceUrl=" +
        url +
        "&pic=" +
        picurl;

      window.open(
        sharesinastring,
        "newwindow",
        "height=400,width=400,top=100,left=100"
      );
    },
    //分享到qq空间

    shareToQq(summary, title, url, picurl) {
      var shareqqzonestring = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=${summary}&title=${title}&url=${url}&pics=${picurl}`;

      window.open(
        shareqqzonestring,
        "newwindow",
        "height=400,width=400,top=100,left=100"
      );
    }
  },

  created() {
    this.AlbumMsgWithImg(this.$route.query.id);
  },
  updated() {
    this.setHeight();
  }
};
</script>

<style>
.album-header {
  overflow: hidden;
  position: relative;
  width: 100%;
}
.album-header-bg {
  width: 998px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  text-align: center;
  color: #444;
}
.album-header-bg .album-title {
  margin-top: 24px;
  font-size: 26px;
  color: #444;
  font-weight: 600;
}
.album-header-bg .album-info {
  margin: 4px 0 10px 0;
  font-size: 16px;
}
.album-header-bg .album-account {
  display: inline-block;
  text-decoration: none;
  position: relative;
}
.album-header-bg .album-account .avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  vertical-align: middle;
}
.album-header-bg .album-account .name,
.album-header-bg .album-account .name:link {
  font-size: 14px;
  margin-left: 6px;
  color: #444;
}
.album-header-bg .album-desc {
  width: 708px;
  margin: 0 auto;
}
.album-header-bg .update-time {
  font-size: 12px;
  color: #aaa;
}
.album-header-bg .album-action {
  margin: 14px 0;
  text-align: center;
}
.album-header-bg .album-action .album-post:link,
.album-header-bg .album-action .album-post:visited {
  margin-right: 18px;
  display: inline-block;
  vertical-align: middle;
  display: inline-block;
  width: 82px;
  height: 30px;
  border-radius: 100px;
  background-color: #ff7e7e;
  font-size: 16px;
  border: 1px solid #ff7e7e;
  line-height: 30px;
  text-align: center;
  color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.album-header-bg .album-action .album-post:link i,
.album-header-bg .album-action .album-post:visited i {
  background-position: -111px -15px;
  margin-right: 2px;
  overflow: hidden;
  line-height: 20px;
}
.album-header i,
.albumshowstyle i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: 0 0;
  vertical-align: sub;
}
.album-header-bg .album-action .album-share,
.album-header-bg .album-action .album-share:hover {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 82px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background-color: #ff9879;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
}
.album-header-bg .album-action .album-share i,
.album-header-bg .album-action .album-share:hover i {
  background-position: -78px -15px;
  overflow: hidden;
  line-height: 20px;
}
.album-header i,
.albumshowstyle i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: 0 0;
  vertical-align: sub;
}
/* 内容 */
#woo-holder {
  line-height: 1.5;
}
.stpics {
  line-height: 1.5;
  width: 982px;
}
.woo-masned {
  zoom: 1;
  overflow: hidden;
  visibility: hidden;
  margin-left: auto;
  margin-right: auto;
}
.clr {
  zoom: 1;
}
.stpics {
  line-height: 1.5;
  width: 982px;
}
.woo-masned {
  zoom: 1;
  overflow: hidden;
  visibility: hidden;
  margin-left: auto;
  margin-right: auto;
}
.stpics .woo {
  float: left;
  height: auto;
  margin: 0 20px 20px 0;
  border-top: 0 none;
  background-color: #fff;
  border-radius: 2px;
}
.woo-masned .woo {
  position: absolute;
  top: -6000px;
}
.stpics .woo .j {
  border-bottom: 1px solid #e0e0e0;
  width: 235px;
  padding: 0;
  border-radius: 2px 2px 0 0;
}
.stpics .woo .mbpho {
  position: relative;
  min-height: 100px;
}
div.stpics .mbpho {
  float: none;
  overflow: hidden;
  width: 235px;
  height: auto;
  margin: 0;
}
div.stpics .mbpho .a {
  position: relative;
  z-index: 9;
}
.stpics .woo .mbpho > a {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.stpics .a {
  float: left;
  width: 100%;
  height: 100%;
}
div.stpics .mbpho img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 235px;
}
.stpics .a u {
  position: absolute;
  top: 0;
  left: 0;
  width: 235px;
  min-height: 100px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 0 !important;
  border: 1px solid #e0e0e0;
}
.collbtn {
  padding: 10px 14px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: none;
  width: 235px;
  height: 44px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
  font-size: 0;
}
.collbtn a:hover,
.collbtn a:link,
.collbtn a:visited {
  display: inline-block;
  margin-right: 25px;
  width: 50px;
  height: 23px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  line-height: 23px;
  border-radius: 20px;
  border: 1px solid #fff;
  text-decoration: none;
  z-index: 500;
  cursor: pointer;
}
.collbtn a:hover.re-done,
.collbtn a:hover.re-zan,
.collbtn a:link.re-done,
.collbtn a:link.re-zan,
.collbtn a:visited.re-done,
.collbtn a:visited.re-zan {
  -webkit-filter: opacity(70%);
  filter: opacity(70%);
}
child {
  margin-right: 0;
}
.stpics .wooscr {
  padding: 14px 0;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: #e0e0e0;
}
.stpics .g {
  padding: 0 14px;
  clear: both;
  overflow: hidden;
  margin: 0;
  font-size: 14px;
  color: #444;
  word-wrap: break-word;
  word-break: break-all;
}
.stpics div.d {
  margin-top: 4px;
  padding: 0 14px;
  overflow: hidden;
  background-color: #fff;
  border-bottom: none;
}

.dn {
  display: none !important;
}
.stpics .d div {
  display: inline-block;
  margin-right: 24px;
}
.woo-pbr {
  height: 60px;
  overflow: hidden;
  padding-top: 16px;
  line-height: 1;
  text-align: center;
}

.woo-pbr .woo-dib {
  display: inline-block;
}
.woo-pbr .woo-dib {
  float: none !important;
  display: inline-block;
  display: -moz-inline-box;
  -moz-box-align: stretch;
  vertical-align: middle;
}
.woo-pbr .woo-dib {
  height: 100%;
}

.stpics .woo:hover .wooscr {
  -webkit-box-shadow: 0 2px 6px 0 rgba(204, 204, 204, 0.5);
  box-shadow: 0 2px 6px 0 rgba(204, 204, 204, 0.5);
}
.woo-pcont .co0:hover .collbtn {
  display: block !important;
}

.woo-pcont .co0 {
  overflow: visible;
  visibility: visible;
}

.clearfloat {
  clear: both;
  height: 0;
}

/* 分页 */
.woo-pbr a:link,
.woo-pbr a:visited,
.woo-pbr li.woo-cur {
  float: left;
  width: 40px;
  height: 40px;
  white-space: no-wrap;
  word-break: keep-all;
  text-align: center;
  border: 1px solid #ffa9a9;
  border-radius: 50%;
  background-color: #fff;
  color: #ff7e7e;
  font-size: 14px;
  line-height: 40px;
}
.woo-pbr li.woo-cur {
  font-weight: 700;
  color: #fff;
  background-color: #ff7e7e;
}
.woo-pbr li {
  float: left;
}
.woo-pbr li {
  height: 40px;
  margin: 0 10px 0 0;
}
</style>