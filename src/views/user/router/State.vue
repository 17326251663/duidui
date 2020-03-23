<template>
  <div>
    <div v-if="imgList.length==0" style="text-align:center;font-size:20px;padding: 100px 0 0 0">
      暂无动态~
    </div>
    <div class="detail-content-list" data-canpublish="true" v-for="(v,i) in imgList" :key="i">
      <div class="dynamic-feed-item dynamic-atlas hasExposure">
        <div class="user-info">
          <a>
            <img class="avatar" :src="msg.imageUrl" />
          </a>
          <div class="user-desc">
            <a>
              <p class="username">{{msg.username}}</p>
            </a>
            <p class="publish-time">发布于 {{mdate(v.uptime)}}</p>
          </div>
        </div>

        <p class="dynamic-album-desc">{{v.info}}</p>

        <router-link  :to="`/imageMsg?imgId=${v.iid}`">
          <!-- 图片资源 -->
          <div class="dynamic-multi-img-container digy-visit">
            <a
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
            </a>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { state , userMessage } from "@/api.js";
export default {
  data() {
    return {
      imgList: [],
      msg: {}
    };
  },
  methods: {
    async state() {
      let { data: result } = await state(this.$route.query.uid);
      if (result.code == "1") {
        this.imgList = result.data;
        this.imgList.forEach(v => {
          v.dataurl = v.dataurl.split(",");
          v.tags = v.tags.split(",");
        });
      }
    },
    async userMessage(){
      let { data : result } = await userMessage(this.$route.query.uid);
      if(result.code=='1')
      this.msg = result.data;
    }
    ,
    //计算时间
          mdate(date){
        let d1 = new Date(date);
        let d2 = new Date();

        let t = (d2.getTime()-d1.getTime())/1000/60;

        if(t>0&&t<60)
          return `${parseInt(t)}分钟前`
        else if(t/60>0&&t/60<24)
          return `${parseInt(t/60)}小时前`
        else if(t/60/24>0&&t/60/24<20)
          return `${parseInt(t/60/24)}天前`
        else if(t/60/24/30>0&&t/60/24/30<12)
          return `${parseInt(t/60/24/30)}月前`
        else  
          return d1.toLocaleString()

      }
  },
  created() {
    this.state();
    this.userMessage();
  }
};

</script>

<style>
a.left-img {
    margin-left: 0;
}

.dynamic-feed-item .dynamic-multi-img-container {
    width: 360px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
}
.dynamic-feed-item .dynamic-multi-img-container a.left-img {
    margin-left: 0;
}
.dynamic-feed-item .dynamic-multi-img-container a {
    /* display: inline-block; */
    /* width: 100%; */
    /* font-size: 0; */
    margin-bottom: 9px;
    margin-left: 9px;
}
.dynamic-feed-item .dynamic-multi-img-container a img {
    width: 114px;
    height: 114px;
    border-radius: 8px;
}

</style>