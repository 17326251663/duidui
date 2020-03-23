<template>
  <div class="content">
    <div class="layer layer-full">
      <!-- 右侧栏开始 -->
      <div class="search-aside">
        <div class="search-list search-history">
          <h3>历史记录</h3>

          <span class="clean-history">清除</span>
          <div class="search-wrap">
            <router-link
              :to="`/s_img?search=${v}&type=1`"
              v-for="(v,i) in history"
              :key="i"
              class="j_history"
            >{{v}}</router-link>
            <span v-if="history.length==0">暂无历史纪录~</span>
          </div>
        </div>
        <div class="search-list search-recom">
          <h3>热门搜索</h3>
          <div class="search-wrap">
            <a class="column-0 row-0" href="/search/?kw=情侣头像&amp;type=feed&amp;from=tuijian">情侣头像</a>
          </div>
        </div>
        <div class="ad-wrap"></div>
      </div>
      <!-- 右侧栏结束 -->

      <!-- 头部栏开始 -->
      <div class="search-header">
        <a name="woo-anchor"></a>
        <ul class="sh-sw">
          <li :class="search.type==`1`?'cur':''" @click="changeType(1)">图片</li>
          <li :class="search.type==`1`?'':'cur'" @click="changeType(0)">专辑</li>
        </ul>
      </div>
      <!-- 头部栏结束 -->
      <!-- 内容开始 -->
      <div class="search-content">
        <div data-spm class="dymswitch-0" id="woo-holder">
          <div
            v-if="sourceList.length==0"
            style="margin: 100px 0;text-align:center;font-size:20px"
          >没有符合查询条件的内容</div>
          <!-- 图片开始 -->
          <el-row v-if="search.type==`1`">
            <el-col :span="8" v-for="(v,i) in sourceList" :key="i" style="margin-bottom:20px">
              <!-- list1 -->
              <div class="j">
                <div class="mbpho" style="height:261px;">
                  <router-link :to="`/imageMsg?imgId=${v.iid}`" class="a">
                    <img data-iid :src="v.dataurl.split(',')[0]" height="261" />
                    <u style="margin-top:-261px;height:261px;" class></u>
                  </router-link>
                  <div
                    class="collbtn"
                    data-favorite="{&quot;id&quot;:368665066,&quot;owner&quot;:6085435,&quot;type&quot;:&quot;1&quot;}"
                    style="position: absolute; left: 0px; bottom: 0px; display: none;"
                  >
                    <a class="y" href="javascript:;">收集</a>
                    <!-- <a class="m" target="_blank" href="/blog/?id="></a> -->
                    <a class="z" href="javascript:;">点赞</a>
                    <a class="x" href="javascript:;">评论</a>
                  </div>
                  <i class="icon-like"></i>
                </div>
                <div class="wooscr">
                  <div class="g">{{v.info}}</div>
                  <el-tag
                    style="margin:5px 0 13px 13px"
                    type="danger"
                    size="mini"
                    v-for="(v2,i2) in v.tags.split(',')"
                    :key="i2"
                  >{{v2}}</el-tag>
                  <div class="d">
                    <div class="d2">
                      <i class="el-icon-thumb"></i>
                      <span>{{v.likenum}}</span>
                    </div>
                    <div class="d1">
                      <i class="el-icon-star-off"></i>
                      <span>{{v.collectnum}}</span>
                    </div>
                    <!-- <span class="d3 dn">0</span> -->
                  </div>
                </div>
              </div>
              <!-- listend -->
            </el-col>
          </el-row>
          <!-- 图片结束 -->
          <el-row v-else class="ssss clrS">
            <el-col :span="8" v-for="(v,i) in sourceList" :key="i">
              <!-- 属性start -->
              <div class="woo co0">
                <router-link :to="`/albumMsg?id=${v.aid}`">
                  <div
                    class="album-cover isAtlas"
                    style="display: flex; justify-content: space-between; position: relative; flex-flow: row wrap;"
                  >
                    <div class="album-mask"></div>
                    <img
                      class="album-mason-img"
                      :style="`background-image: url('${v.imgList.length==0?'':v.imgList[0].dataurl.length>0?v.imgList[0].dataurl[0]:''}'); width: 219px; height: 106px; position: absolute; top: 5px; left: 5px; margin-bottom: 8px;`"
                    />
                    <img
                      class="album-mason-img"
                      :style="`background-image: url('${v.imgList.length==0?'':v.imgList[0].dataurl.length>1?v.imgList[0].dataurl[1]:v.imgList[0].dataurl[0]}'); width: 106px; height: 106px; position: absolute; top: auto; right: 5px; bottom: 5px;`"
                    />
                    <img
                      class="album-mason-img"
                      :style="`background-image: url('${v.imgList.length==0?'':v.imgList[0].dataurl.length>2?v.imgList[0].dataurl[2]:v.imgList[0].dataurl.length>1?v.imgList[0].dataurl[1]:v.imgList[0].dataurl[0]}'); width: 106px; height: 106px; position: absolute; bottom: 5px; left: 5px; top: auto;`"
                    />
                  </div>
                  <div class="album-info">
                    <h3>{{v.aname}}</h3>
                    <p>{{v.imgNum}}图片 · {{v.collectNum}}收藏</p>
                  </div>
                </router-link>
              </div>
              <!-- 属性end -->
            </el-col>
          </el-row>

          <!-- 底部翻页条 -->
          <div class="block" align="center">
            <span class="demonstration"></span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="search.pageNum"
              :page-sizes="[6, 9, 12, 24]"
              :page-size="search.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- 内容结束 -->
    </div>
  </div>
</template>

<script>
import { selectSourceByCondition } from "@/api.js";
export default {
  data() {
    return {
      search: {
        type: "1",
        content: "",
        pageNum: 1,
        pageSize: 12
      },
      sourceList: [],
      total: 20,
      history: [],
      hotHistory: []
    };
  },
  methods: {
    async selectSourceByCondition() {
      let { data: result } = await selectSourceByCondition(this.search);
      if (result.code == 1) {
        this.sourceList = result.data.list;
        // 判断是否为专辑
        if (this.search.type != "1") {
          //专辑切割
          this.sourceList.forEach(element => {
            //设置收藏数量计数器
            let collectNum = 0;
            //设置图片数量计数器
            let imgNum = 0;
            // 获取到专辑所属图片信息
            if (element.imgList && element.imgList != "") {
              element.imgList.forEach(e2 => {
                //切割图片集
                e2.dataurl = e2.dataurl.split(",");

                imgNum += e2.dataurl.length;
                collectNum += e2.collectnum;
              });
            } else {
              element.imgList = [];
            }
            element.collectNum = collectNum;
            element.imgNum = imgNum;
          });
        }
        this.total = result.data.total;
      }
    },
    //改变搜索类型
    changeType(type) {
      this.$router.push(`/s_img?search=${this.search.content}&type=${type}`);
      this.search.type = this.$route.query.type;
      this.selectSourceByCondition();
    },

    //分页
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.selectSourceByCondition();
    },
    handleCurrentChange(val) {
      this.search.pageNum = val;
      this.selectSourceByCondition();
    }
  },
  created() {
    this.search.type = this.$route.query.type;
    this.selectSourceByCondition();
    if (localStorage.getItem("history"))
      this.history = JSON.parse(localStorage.getItem("history"));
  },
  watch: {
    $route() {
      this.search.type = this.$route.query.type;
      this.search.content = this.$route.query.search;
      this.search.pageNum = 1;
      this.search.page = 12;
      this.selectSourceByCondition();
    }
  }
};
</script>

<style>
#content {
  width: 1000px;
  min-height: 607px;
  margin: 0 auto;
  padding-bottom: 24px;
}
.layer {
  zoom: 1;
  width: 100%;
  margin: 0 auto;
}
.search-aside {
  float: right;
  width: 195px;
}
.search-header {
  width: 785px;
  height: 62px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.search-aside .search-list {
  position: relative;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  overflow: hidden;
}
.search-aside .search-list h3 {
  padding: 10px 0;
  font-size: 16px;
  color: #444;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
}
.search-aside .search-list .clean-history {
  opacity: 0;
  position: absolute;
  top: 15px;
  right: 20px;
  color: #ff7e7e;
  cursor: pointer;
}
.search-aside .search-list .search-wrap {
  display: -ms-grid;
  display: grid;
  padding: 16px 16px 16px 0;
  -ms-grid-columns: 80px 80px;
  grid-template-columns: 80px 80px;
}
.search-header .sh-sw {
  width: 100%;
  height: 62px;
  padding: 20px 147px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
  border: 1px solid #e0e0e0;
  overflow: hidden;
}
.search-header .sh-sw li.cur {
  position: relative;
  font-size: 16px;
  color: #ff7e7e;
  font-weight: 700;
}

.search-header .sh-sw li {
  position: relative;
  width: 52px;
  height: 100%;
  margin-right: 60px;
  line-height: 28px;
  text-align: center;
}

.search-header .sh-sw li.cur::after {
  content: "";
  position: absolute;
  bottom: -9px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 16px;
  height: 2px;
  background-color: #ff7e7e;
  border-radius: 1px;
}
.search-content {
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
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-flow: column nowrap;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  width: 785px;
  min-height: 260px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.search-content #woo-holder {
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 19px;
  border: 1px solid #e0e0e0;
}
#woo-holder {
  line-height: 1.5;
}

.dymswitch-0 {
  background-position: -4px -2px;
}

.j {
  border-bottom: 1px solid #e0e0e0;
  width: 235px;
  padding: 0;
  border-radius: 2px 2px 0 0;
}

.j .mbpho {
  position: relative;
  min-height: 100px;
}
.j .mbpho {
  float: none;
  overflow: hidden;
  width: 235px;
  height: auto;
  margin: 0;
}
.j .mbpho .a {
  position: relative;
  z-index: 9;
}

.j .mbpho > a {
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
.j .mbpho img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 235px;
}
.j .a u {
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
.collbtn a:hover:last-child,
.collbtn a:link:last-child,
.collbtn a:visited:last-child {
  margin-right: 0;
}
.j .wooscr {
  padding: 14px 0;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: #e0e0e0;
}
.wooscr .g {
  padding: 0 14px;
  clear: both;
  overflow: hidden;
  margin: 0;
  font-size: 14px;
  color: #0802028c;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}
.j div.d {
  margin-top: 4px;
  padding: 0 14px;
  overflow: hidden;
  background-color: #fff;
  border-bottom: none;
}
.j .d div {
  display: inline-block;
  margin-right: 24px;
}

.j .d span {
  font-size: 13px;
  color: #a0a0a0;
  line-height: 20px;
}

.j .d i {
  display: inline-block;
  margin-right: 2px;
  width: 20px;
  height: 20px;
  vertical-align: inherit;
}

.j .a u {
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
.j:hover .wooscr {
  -webkit-box-shadow: 0 2px 6px 0 rgba(204, 204, 204, 0.5);
  box-shadow: 0 2px 6px 0 rgba(204, 204, 204, 0.5);
}

.j u:hover {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: rgba(0, 0, 0, 0.08);
}
.j:hover .collbtn {
  display: block !important;
}
.sh-sw li {
  cursor: pointer;
}

.ssss .woo {
  float: left;
  width: 233px;
  height: 324px !important;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}

.ssss .woo .album-cover {
  padding: 8px;
  width: 100%;
  height: 228px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
  position: relative;
  cursor: pointer;
}

.ssss .woo .album-cover .album-mask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  z-index: 99;
}
.ssss .woo .album-cover img {
  max-width: 217px;
  max-height: 217px;
}
.ssss .woo .album-cover > .album-mason-img {
  background-size: cover;
  background-position: center center;
}
.ssss .woo .album-info {
  position: relative;
  padding: 16px 0;
  height: 94px;
  width: 100%;
  text-align: center;
  -webkit-box-shadow: 0 8px 0 -6px #fff, 0 8px 0 -5px #e0e0e0;
  box-shadow: 0 8px 0 -6px #fff, 0 8px 0 -5px #e0e0e0;
}
.ssss .woo .album-info h3 {
  margin-bottom: 2px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  line-height: 22px;
  font-size: 14px;
  font-weight: 600;
  color: #444;
}

.ssss .woo .album-info p {
  line-height: 17px;
  font-size: 12px;
  color: #777;
}

.ssss .woo .album-cover:hover .album-mask {
  opacity: 1;
}

.ssss .woo:hover .album-info {
  -webkit-box-shadow: 0 8px 0 -6px #fff, 0 8px 5px -5px #e0e0e0;
  box-shadow: 0 8px 0 -6px #fff, 0 8px 5px -5px #e0e0e0;
}
.j_history {
  color: black !important;
  margin: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.j_history:hover{
    color: pink !important;
}
.j_history:active{
    color: rgba(77, 77, 230, 0.644) !important;
}
</style>