<template>
  <div>
    <div class="dynamic-feed-item dynamic-atlas hasExposure" v-for="(v,i) in imageList" :key="i">
      <!-- 用户基本信息 -->
      <div class="feed-container">
        <div class="user-info">
          <router-link :to="`/state?uid=${v.album.user.uid}`">
            <img class="avatar" :src="v.album.user.imageUrl" />
          </router-link>
          <div class="user-desc">
            <router-link :to="`/state?uid=${v.album.user.uid}`">
              <p class="username">{{v.album.user.username}}</p>
            </router-link>
            <p class="publish-time">热门内容</p>
          </div>
        </div>

        <p class="dynamic-album-desc">{{v.info}}</p>
        <!-- 图片资源 -->
        <div class="dynamic-multi-img-container digy-visit">
          <router-link
            :to="`/imageMsg?imgId=${v.iid}`"
            class="left-img"
            v-for="(v2,i2) in v.dataurl"
            :key="i2"
          >
            <img
              v-if="v.dataurl.length==1"
              class="dynamic-multi-img"
              :src="v2"
              style="width:100%;height:auto"
            />

            <img v-else class="dynamic-multi-img" :src="v2" />
          </router-link>
        </div>
      </div>
      <div class="de-action">
        <div class="action-list" data-type="atlas" data-id="109776234">
          <div class="like-action one-action" @click="likeImg(v)">
            <img src="@/assets/zan.png" />
            <span class="detail-text">{{v.likenum}}</span>
          </div>

          <div class="favorite-action one-action" @click="collectImg(v)">
            <img src="@/assets/shoucang.png" />
            <span class="detail-text">{{v.collectnum}}</span>
          </div>

          <el-dropdown class="more-action one-action">
            <i class="el-icon-more" style="font-size:20px">
              &nbsp;
              <font style="font-size:16px;margin-left:5px;vertical-align: unset;">更多</font>
            </i>
            <!-- 下拉 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-share">
                <span
                  @click="shareToQq('堆堆社区图片分享','堆堆社区',`127.0.0.1/imageMsg?imgId%3D${v.iid}`,`${v.dataurl[0]}`)"
                >分享至空间</span>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-share" divided>
                <span
                  @click="shareToXl('堆堆社区图片分享',`127.0.0.1/imageMsg?imgId%3D${v.iid}`,`${v.dataurl[0]}`)"
                >分享至微博</span>
              </el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 翻页 -->
    <div class="view-more" style="display: block;" v-if="key" @click="selectChoiceness">查看更多</div>
  </div>
</template>

<script>
import { selectChoiceness, collectImg, likeImg } from "@/api.js";

export default {
  data() {
    return {
      imageList: [],
      pageNum: 1,
      pageSize: 10,
      key: false
    };
  },
  methods: {
    async selectChoiceness() {
      let { data: result } = await selectChoiceness(
        this.pageNum,
        this.pageSize
      );
      if (result.code == "1") {
        //对专辑和图片列表进行操作
        result.data.list.forEach(v => {
          v.dataurl = v.dataurl.split(",");
          v.tags = v.tags.split(",");
        });

        this.imageList = this.imageList.concat(result.data.list);

        if (result.data.total <= this.pageNum * this.pageSize) {
          this.key = false;
        } else {
          this.key = true;
          //将指针后移
          this.pageNum += 1;
        }
      }
    },
    //收藏
    async collectImg(imgList) {
      let { data: result } = await collectImg(imgList.iid);
      if (result.code == 1) {
        if (result.message == "收藏成功") {
          imgList.collectnum += 1;
        } else {
          imgList.collectnum -= 1;
        }
      } else {
        this.$message.error(result.message);
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loginUser");
          location.reload();
        }
      }
    },
    //点赞
    async likeImg(imgList) {
      let { data: result } = await likeImg(imgList.iid);
      if (result.code == 1) {
        if (result.message == "点赞成功") {
          imgList.likenum += 1;
        } else {
          imgList.likenum -= 1;
        }
      } else {
        this.$message.error(result.message);
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loginUser");
          location.reload();
        }
      }
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
    this.selectChoiceness();
  }
};
</script>

<style>
</style>