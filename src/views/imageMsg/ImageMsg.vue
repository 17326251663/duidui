<template>
  <div>
    <div class="pg-atlas-content">
      <section class="wrap-container">
        <section class="pg-atlas">
          <section class="atlas-detail">
            <section class="author" data-userid="10641590">
              <div class="author-wrap">
                <!-- 用户信息开始 -->
                <router-link
                  :to="`/state?uid=${imgList.album.user.uid}`"
                  class="link"
                  href="/people/?user_id=10641590"
                >
                  <img :src="imgList.album.user.imageUrl" />
                </router-link>
                <div class="author-info">
                  <router-link
                    :to="`/state?uid=${imgList.album.user.uid}`"
                    class="name"
                  >{{imgList.album.user.username}}</router-link>
                  <span class="create-at">{{new Date(imgList.uptime).toLocaleString()}}</span>
                </div>
              </div>
              <a
                class="attention-status"
                href="javascript:;"
                v-if="attention"
                @click="attentionUser()"
                style="background-color:#ff7e7e8a"
              >已关注</a>
              <a class="attention-status" href="javascript:;" v-else @click="attentionUser()">关注</a>
              <!-- 用户信息结束 -->
            </section>
            <div class="atlas-desc">{{imgList.info}}&nbsp;</div>
            <div class="atlas-mode">
              <ul class="atlas-wrap">
                <!-- 资源图片 -->
                <el-image
                  class="atlas-item"
                  :src="v"
                  v-for="(v,i) in imgList.dataurl"
                  :key="i"
                  :preview-src-list="imgList.dataurl"
                ></el-image>
              </ul>
            </div>

            <div class="atlas-tags">
              <el-tag v-for="(v,i) in imgList.tags.split(',')" :key="i" type="danger">{{v}}</el-tag>
              <a
                href="javascript:;"
                class="add-tag"
                v-if="userkey"
                style="margin: 0 0 0px 20%;"
                @click="openImgTags"
              >+ 编辑标签</a>
            </div>
          </section>
          <section class="operate-wrap">
            <a class="operate-item like" @click="likeImg(imgList)">
              <img src="@/assets/zan.png" />
              <span>{{imgList.likenum}}</span>
            </a>
            <a class="operate-item comment" href="javascript:;" @click="reviewKey=!reviewKey">
              <img src="@/assets/huifu.png" />
              评论
            </a>
            <a class="operate-item collection" @click="collectImg(imgList)">
              <img src="@/assets/shoucang.png" />
              <span>{{imgList.collectnum}}</span>
            </a>
            <el-dropdown>
              <a class="operate-item more" href="javascript:;">
                <img src="@/assets/gengduo.png" />
                更多
                <!-- 下拉 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-share">
                    <span
                      @click="shareToQq('堆堆社区图片分享','堆堆社区',`127.0.0.1/imageMsg?imgId%3D${$route.query.imgId}`,`${imgList.dataurl[0]}`)"
                    >分享至空间</span>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-share" divided>
                    <span
                      @click="shareToXl('堆堆社区图片分享',`127.0.0.1/imageMsg?imgId%3D${$route.query.imgId}`,`${imgList.dataurl[0]}`)"
                    >分享至微博</span>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-edit" v-if="userkey" divided>编辑</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete" v-if="userkey" divided>
                    <span @click="delImgList">删除</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided></el-dropdown-item>
                </el-dropdown-menu>
              </a>
            </el-dropdown>
            <!-- 结束 -->
          </section>
        </section>

        <!-- 对本文发布评论 -->
        <div id="pg-bottom-comment" class="comment-wrap hide" v-if="reviewKey">
          <div class="bottom-comment-content">
            <span>回复</span>
            <textarea
              name="comment"
              id="operate-comment"
              v-model="review.info"
              cols="80"
              rows="2"
              placeholder="说些什么吧..."
            ></textarea>
          </div>
          <div class="bottom-comment-button">
            <div class="bottom-comment-submit" style="margin-left: 77%;">
              <a href="javascript:;" class="comment-cancel" @click="reviewKey=false">取消</a>
              <a
                href="javascript:;"
                class="comment-submit"
                @click="addImgReview($route.query.imgId,0,imgList.album.user.uid)"
              >发送</a>
            </div>
          </div>
        </div>
        <!-- 评论区 -->
        <div id="pg-comment-all" class="md-pc-comment">
          <div class="cmt-normal-comment">
            <div class="cmt-title">
              <span>所有评论</span>
            </div>
            <div class="cmt-list">
              <ul v-if="reviewList.length!=0">
                <li class="cmt clr" v-for="(v,i) in reviewList" :key="i">
                  <div class="line-split-h"></div>
                  <router-link :to="`/state?uid=${v.uid}`" class="sender-avatar">
                    <img class="circle-icon" :src="v.user.imageUrl" />
                  </router-link>
                  <div class="cmt-r">
                    <div class="cmt-r-info clr">
                      <router-link
                        class="cmt-r-name"
                        :to="`/state?uid=${v.uid}`"
                      >{{v.user.username}}</router-link>
                      <span class="cmt-r-time">{{new Date(v.infoTime).toLocaleDateString()}}</span>
                    </div>
                    <div class="commont-data">
                      <div class="cmt-box">
                        <p class="cmt-maincont">{{v.info}}</p>
                        <div class="cmt-r-item-ft clr">
                          <div class="cmt-r-item-pos">
                            <span class="cmt-like" @click="likereview(v)">
                              <em>
                                <i class="el-icon-thumb"></i>
                                {{v.likeNum}}
                              </em>
                            </span>
                            <span class="cmt-reply-btn">
                              <!-- //<em>回复</em> -->
                            </span>
                            <span class="r c-more"></span>
                          </div>
                        </div>
                        <div class="reply-box cmt-dn">
                          <div class="comment-input-in cmt-dn">
                            <textarea placeholder="说些什么吧"></textarea>
                            <div class="comment-send-btn-wrap">
                              <a class="comment-send-btn" href="javascript:;">发送</a>
                              <a class="comment-send-cancel" href="javascript:;">取消</a>
                            </div>
                          </div>
                          <div class="reply-box-in"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  class="cmt-show-more-comment"
                  @click="lookImgReview(true)"
                  v-if="total>this.imgReviewVo.pageSize"
                >
                  <a href="javascript:;">
                    全部评论
                    <i class="el-icon-arrow-down"></i>
                  </a>
                </li>
              </ul>
              <div
                v-else
                style="    font-size: 20px;
                            color: #a1a1a1;
                            text-align: center;
                            padding: 60px 0;
                            margin-bottom: 10%;"
              >暂无评论,快快留言吧~</div>
            </div>
          </div>
        </div>
      </section>
      <!-- 专辑信息 -->
      <aside class="wrap-siderbar">
        <section class="related-album">
          <router-link :to="`/albumMsg?id=${imgList.album.aid}`">
            <div class="at-album" data-href="/album/?id=96426524">
              <img :src="imgList.dataurl[0]" />
              <div class="related-info">
                <p class="album-title">
                  发布至专辑
                  <em>{{imgList.album.aname}}</em>
                </p>
                <p class="album-data">
                  <span class="count">心动就在这里</span>
                  <span>点击查看专辑</span>
                </p>
              </div>
            </div>
          </router-link>
        </section>
        <section class="wangmai-ad-wrap" style="margin-bottom: 20px;"></section>
      </aside>
    </div>
              <!-- 更新标签 -->
              <el-dialog
              title="编辑标签"
              :visible.sync="updateImgTagsKey"
              width="30%"
              :close-on-click-modal=false>
              <span>
              <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              type="danger"
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
              </el-tag>

              <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

              </span>
              <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="updateTags" size="mini">更新标签</el-button>
              </span>
              </el-dialog>
  </div>
</template>

<script>
import {
  selectImageByImgId,
  selectReviewByImgId,
  collectImg,
  likeImg,
  addImgReview,
  lookImgReview,
  likereview,
  isAttention,
  attentionUser,
  delImgListByImgIdWithUid,
  updateTags
} from "@/api";

export default {
  data() {
    return {
      imgList: {
        dataurl: [],
        album: {
          user: {}
        },
        tags: ""
      },
      userkey: false,
      reviewKey: false,
      imgReviewVo: {
        type: "0",
        pageNum: 1,
        pageSize: 10,
        imgId: 1,
        parentId: 0
      },
      review: {
        parentId: 0,
        imgId: 0,
        toUid: 1
      },
      reviewList: [],
      total: 1,
      attention: true,
      updateImgTagsKey:false,
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    async selectImageByImgId() {
      let { data: result } = await selectImageByImgId(this.$route.query.imgId);
      if (result.code == "1") {
        this.imgList = result.data;
        this.imgList.dataurl = this.imgList.dataurl.split(",");

        if (sessionStorage.getItem("loginUser")) {
          let user = JSON.parse(sessionStorage.getItem("loginUser"));
          if (this.imgList.album.user.uid == user.uid) {
            this.userkey = true;
            this.dynamicTags = this.imgList.tags.split(',')
          }
        }
      }
      //是否关注
      this.isAttention();
    },
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
    async addImgReview(imgId, parentId, toUid) {
      this.review.toUid = toUid;
      this.review.imgId = imgId;
      this.review.parentId = parentId;
      let { data: result } = await addImgReview(this.review);
      if (result.code == 1) {
        this.$message.success(result.message);
        this.imgReviewVo.info = "";
        this.reviewKey = false;
        this.lookImgReview();
      } else {
        this.$message.error(result.message);
        if (sessionStorage.getItem("token")) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("loginUser");
          location.reload();
        }
      }
    },

    async lookImgReview(all) {
      if (all) this.imgReviewVo.pageSize = this.total;

      this.imgReviewVo.imgId = this.$route.query.imgId;
      let { data: result } = await lookImgReview(this.imgReviewVo);
      if (result.code == 1) {
        this.reviewList = result.data.list;
        this.total = result.data.total;
      } else {
        this.$message.error(result.message);
      }
    },

    async likereview(ele) {
      let { data: result } = await likereview(ele.rid);
      if (result.code == 1) {
        if (result.message == "点赞成功") {
          ele.likeNum += 1;
        } else {
          ele.likeNum -= 1;
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
    //是否关注
    async isAttention() {
      let { data: result } = await isAttention(this.imgList.album.user.uid);
      if (result.code == 1) {
        if (result.message == "已关注") {
          this.attention = true;
        } else {
          this.attention = false;
        }
      }
    },
    //关注
    async attentionUser() {
      if (!sessionStorage.getItem("loginUser")) {
        this.$message.error("请先登录");
        return;
      }

      let { data: result } = await attentionUser(this.imgList.album.user.uid);

      if (result.code == 1) {
        if (result.message == "关注成功") this.attention = true;
        else this.attention = false;
      } else {
        this.$message.error(result.message);
      }
    },
    //删除这个图片集
    delImgList() {
      this.$confirm("此操作将永久删除该图片集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { data: result } = await delImgListByImgIdWithUid(
            this.imgList.iid
          );

          if (result.code == 1) {
            this.$message.success(result.message);
            this.$router.push("/");
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //打开编辑标签
    async openImgTags(){
      this.dynamicTags = this.imgList.tags.split(',')
      this.updateImgTagsKey = true
    },


    //编辑图片标签
    async updateTags() {

      let img  = {
        tags : this.dynamicTags.join(','),
        iid :  this.imgList.iid
      }

      let { data: result } = await updateTags(img);
      
      if(result.code==1){
        this.$message.success(result.message)
        this.imgList.tags = this.dynamicTags.join(',')
        this.updateImgTagsKey = false
      }else{
        this.$message.error(result.message)
      }
    },

      handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
      this.$refs.saveTagInput.$refs.input.focus();
      });
      },

      handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
      this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
      }
    ,
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
    this.selectImageByImgId();
    this.lookImgReview();
  }
};
</script>

<style>
@import url("../../assets/css/imageMsg/imageMsg.css");
</style>