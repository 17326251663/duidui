<template>
  <div class="c_content-list">
    <ul class="detail-content-list" v-if="imgCollectList.length!=0">
      <div  v-for="(v,i) in imgCollectList" :key="i">
        <div class="c_favorite-item type-atlas" v-if="v">
          <router-link :to="`imageMsg?imgId=${v.iid}`">
            <div class="favorite-cover">
              <span class="album-count">{{v.dataurl.split(',').length}}</span>
              <img
                class="album-mason-img"
                :src="v.dataurl.split(',')[0]"
              />
            </div>
          </router-link>
          <div class="favorite-info">
            <router-link :to="`imageMsg?imgId=${v.iid}`">
              <p>
                收藏图片集
                <strong>
                  {{v.info}}
                </strong>
              </p>
            </router-link>
            <p class="add-time">{{new Date().toLocaleString()}}</p>
          </div>
          <a href="javascript:;" class="deleted-favorite">_(:з」∠)_</a>
        </div>
      </div>
    </ul>
    <div v-else style="font-size: 20px;text-align: center;padding: 41px 0 100px 0;">暂无收藏~</div>
  </div>
</template>

<script>
import { selectCollectImgList } from "@/api.js";
export default {
  data() {
    return {
      imgCollectList: []
    };
  },
  methods: {
    async selectCollectImgList() {
      let { data: result } = await selectCollectImgList(this.$route.query.uid);
      if (result.code == 1) {
        this.imgCollectList = result.data;
      }
    }
  },
  created() {
    this.selectCollectImgList();
  }
};
</script>

<style>
.c_content-list .detail-content-list .c_favorite-item {
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
  margin-bottom: 20px;
  padding: 0;
  position: relative;
  border: 1px solid #e0e0e0;
}

.c_content-list .detail-content-list .c_favorite-item .favorite-cover {
  position: relative;
  width: 132px;
  height: 132px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 20px;
  overflow: hidden;
}

.c_content-list
  .detail-content-list
  .c_favorite-item
  .favorite-cover
  .album-count {
  position: absolute;
  bottom: 4px;
  right: 4px;
  padding: 2px 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  font-size: 12px;
  line-height: 17px;
  color: #fff;
  z-index: 10;
}

.c_content-list
  .detail-content-list
  .c_favorite-item
  .favorite-cover
  img.album-mason-img {
  width: 130px;
  height: 130px;
}
.c_content-list
  .detail-content-list
  .c_favorite-item
  .favorite-cover
  .album-mason-img {
  background-size: cover;
  background-position: center center;
}

.c_content-list .detail-content-list .c_favorite-item .favorite-info {
    padding: 10px;
    display: inline-block;
    width: 380px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    background-color: #fafafa;
    margin: 20px 20px 0px 21px;
}

.c_content-list .detail-content-list .c_favorite-item .favorite-info a {
  font-size: 16px;
  color: #444;
  line-height: 24px;
}

.c_content-list .detail-content-list .c_favorite-item .favorite-info a p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.c_content-list
  .detail-content-list
  .c_favorite-item
  .favorite-info
  a
  p
  strong {
  margin-left: 5px;
}

.c_content-list .detail-content-list .c_favorite-item .favorite-info .add-time {
  margin-top: 4px;
  font-size: 12px;
  color: #b8b8b8;
  line-height: 17px;
}

.c_content-list .detail-content-list .c_favorite-item .deleted-favorite {
  display: none;
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 14px;
  color: #ff7e7e;
}

.c_content-list .detail-content-list .c_favorite-item:hover .deleted-favorite {
  display: block;
}
</style>