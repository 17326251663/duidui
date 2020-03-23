<template>
  <div>
    <!-- 页头 -->
    <div class="ic_header">
      <h1 style="text-align:center">{{$route.query.name}}</h1>
      <el-row v-if="category.length!=0">
        <el-col :span="24/category.length" v-for="(v,i) in category" :key="i" class="child">
          <p>{{v.cname}}</p>
          <el-button
            type="text"
            v-for="(vc,ic) in v.mlist"
            :key="ic"
            @click="selectImage(v.cname,vc.cname)"
          >{{vc.cname}}</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0 20px 0">
      <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(v,i) in header" :key="i">{{v}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--资源列表  -->
    <!-- 此处使用卡片格式 -->
    <div>
      <div class="infinite-list-wrapper ic_box" style="overflow:auto" v-if="imgList.length!=0">
        <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <el-row>
            <el-col :span="6" v-for="(v,i) in imgList" :key="i">
              <!--  -->
              <router-link :to='`/imageMsg?imgId=${v.iid}`'>
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <img
                    style="width:100%"
                    :src="v.dataurl"
                    class="image"
                  />
                  <div style="padding: 14px;">
                    <span>简介：{{v.info}}</span>
                    <div class="bottom clearfix">
                      <time class="time"></time>
                        <p>发布时间：{{new Date(v.uptime).toLocaleString()}}</p>
                        <p>
                            <i class="el-icon-thumb">{{v.likenum}} </i>
                            &nbsp;
                            <i class="el-icon-star-off"> {{v.collectnum}}</i>
                        </p>
                        <el-tag type="danger" v-for="(v1,i1) in v.tags.split(',')" :key="i1" size='mini'>{{v1}}</el-tag>
                    </div>
                  </div>
                </el-card>
              </router-link>
              <!--  -->
            </el-col>
          </el-row>
        </ul>

        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>

      <div v-else style="text-align: center;padding:10% 0 20% 0;font-size: 25px;">暂无资源哦~</div>
    </div>
  </div>
</template>

<script>
import { selectCateByParentid, selectImageByTagName } from "@/api.js";

export default {
  data() {
    return {
      category: [],
      imgList: [],
      header: [],
      imageVo: {
        tagName: "",
        pageSize: "12",
        pageNum: "1"
      },
      loading: false,
      total: "20"
    };
  },
  methods: {
    async selectCateByParentid() {
      let { data: result } = await selectCateByParentid(this.$route.query.id);
      if (result.code == 1) {
        this.category = result.data;
      }
    },
    selectImage(name1, name2) {
      this.imgList = [];
      this.imageVo.pageNum = 1;
      this.imageVo.pageSize = 12;
      this.header = [name1, name2];
      this.imageVo.tagName = name2;
      this.selectImageByTagName();
    },
    async selectImageByTagName() {
      let { data: result } = await selectImageByTagName(this.imageVo);
      if (result.data.list.length != 0)
      this.imgList =  this.imgList.concat([ ...result.data.list ]);
      console.log(this.imgList);
      this.total = result.data.total;
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.pageNum += 1;
        this.selectImageByTagName();
        this.loading = false;
      }, 2000);
    }
  },
  created() {
    this.imageVo.tagName = this.$route.query.name;
    this.selectCateByParentid();
    this.selectImageByTagName();
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route(to, from) {
      this.selectCateByParentid();
    }
  },
  computed: {
    noMore() {
      return this.imageVo.pageNum * this.imageVo.pageSize >= this.total;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  }
};
</script>

<style>
.ic_header {
  padding: 2%;
  border: #dfdfe2 1px solid;
}
.ic_header .child:not(:last-child) {
  border-right: #dfdfe2 1px solid;
}
.ic_header .child:not(:first-child) {
  padding-left: 5%;
}
.ic_header .child {
  padding-right: 5%;
}

.ic_header p {
  font-size: 12px;
}
.ic_header button {
  color: black !important;
  margin-left: 0 !important;
  margin-right: 10px;
  font-size: 16px;
}
.ic_header button:hover {
  color: pink !important;
}
.ic_box {
  height: 1000px;
}
</style>