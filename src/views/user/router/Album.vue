<template>
  <ul class="detail-content-list" data-showpublish="true">
    <a class="createalbum-pp tc add-album" id="createalbum-pp" v-if='$route.query.uid==uid'>
      <!-- 新建 -->
      <div class="smbg" @click="open_add_album">
        <p>
          <i class="el-icon-plus"></i>
          <span>新建专辑</span>
        </p>
      </div>
    </a>
    <!-- 资源 -->
    <div v-if="albumList.length==0" style="text-align:center;font-size:20px;padding: 100px 0 100px 230px">
      暂无专辑~
    </div>
    <div class="album-item" v-for="(v,i) in albumList" :key="i">
      <router-link :to="`/albumMsg?id=${v.aid}`">
        <div
          class="album-cover isAtlas"
          style="display: flex; justify-content: space-between; position: relative; flex-flow: row wrap;"
        >
          <div class="album-mask"></div>
          <div
            :style="`background-image: url(&quot;${v.cover}&quot;);width: 100%;background-size: contain;`"
          ></div>
        </div>
        <div class="album-info">
          <h3>{{v.aname==undefined?'默认名称':v.aname}}</h3>
          <p>{{v.imgnum}}图片 · 0收藏</p>
        </div>
      </router-link>
    </div>

    <!-- 弹出层,添加专辑 -->
    <el-dialog title="创建专辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" >
      <el-row>
        <el-col :md="14">
          <el-form :model="album" class="add_album">
            <el-form-item label="专辑名" :label-width="formLabelWidth">
              <el-input v-model="album.aname" autocomplete="off" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="album.info" autocomplete="off" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="标签" :label-width="formLabelWidth">
              <el-input
                v-model="album.label"
                autocomplete="off"
                size="mini"
                placeholder="多个标签用空格隔开"
                maxlength="20"
              ></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
              <el-button type="danger" size="small" class="border" @click="addAlbum">创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :md="9" :offset="1">
          <p>常用标签</p>
          <br />
          <div>
            <el-tag
              type="danger"
              style="margin:0 10px 15px 0;background-color:#fff;cursor: pointer;"
              v-for="(v,i) in labels"
              :key="i"
              @click="add_to_label(v.oname)"
            >{{v.oname}}</el-tag>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </ul>
</template>

<script>
import { AlbumwithImg, selectOftenLabel, addAlbum } from "@/api.js";
export default {
  data() {
    return {
      albumList: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      album: {
        label: ""
      },
      labels: [],
      uid:''
    };
  },
  methods: {
    async AlbumwithImg() {
      let { data: result } = await AlbumwithImg(this.$route.query.uid);
      if (result.code == "1") {
        this.albumList = result.data;
        this.albumList.forEach(e => {
          //专辑图片数量
          var num = 0;
          if (e.imgList.length != 0) {
            e.imgList.forEach(c => {
              c.dataurl = c.dataurl.split(",");
              num += c.dataurl.length;
              //选取一个图片作为封面
              if (num >= 1) e.cover = c.dataurl[0];
            });
          }
          //
          e.imgnum = num;
        });
      }
    },
    //打开新增专辑窗口
    open_add_album() {
      this.dialogFormVisible = true;
      this.selectOftenLabel();
    },
    //新增专辑
    async addAlbum() {
      if (
        this.album.label.split(" ").length > 4 ||
        this.album.label.length > 20
      ) {
        this.$message.error("最多选择4个标签,长度在20以内");
        return;
      }

      let { data: result } = await addAlbum(this.album,0);
      if (result.code == "1") {
        this.$message.success(result.message);
        this.AlbumwithImg()
         this.dialogFormVisible = false;
        this.album = {
          label: ""
        };
      } else {
        this.$message.error(result.message);
      }
    },
    add_to_label(oname) {
      let key = true;

      this.album.label.split(" ").forEach(v => {
        if (v == oname) {
          key = false;
          return;
        }
      });
      if (key) this.album.label += " " + oname;
    },
    async selectOftenLabel() {
      let { data: result } = await selectOftenLabel();
      if (result.code == "1") {
        this.labels = result.data;
      }
    }
  },
  created() {
    this.AlbumwithImg();
    let login = JSON.parse(sessionStorage.getItem('loginUser'))
    if(login)
    this.uid = login.uid
  }
};
</script>

<style>
.border {
  border-radius: 0;
}
.detail-content-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row wrap;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
}
.detail-content-list .add-album {
  display: inline-block;
  position: relative;
  width: 270px;
  height: 345px;
  text-decoration: none;
  margin-bottom: 23px;
}
.detail-content-list .add-album .smbg {
  width: 270px;
  height: 345px;
  background-color: #fafafa;
  border: 2px dashed #e0e0e0;
}
.detail-content-list .add-album .smbg p {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #aaa;
  font-size: 12px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-flow: column nowrap;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.detail-content-list .add-album .smbg p i {
  display: inline-block;
  margin-bottom: 10px;
  width: 50px;
  font-size: 40px;
  font-weight: 800;
  line-height: 50px;
  text-align: center;
  color: #ff000075;
  height: 50px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: white;
  border-radius: 50%;
}
.detail-content-list .add-album .smbg p span {
  line-height: 15px;
}
.detail-content-list .album-item {
  width: 270px;
  height: 346px;
  margin-bottom: 23px;
  border: 1px solid #e0e0e0;
}
.detail-content-list .album-item .album-cover {
  padding: 10px;
  width: 268px;
  height: 269px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
  position: relative;
  cursor: pointer;
}
.detail-content-list .album-item .album-cover .album-mask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  z-index: 9;
}
.detail-content-list .album-item .album-info {
  position: relative;
  padding: 16px 0;
  width: 100%;
  text-align: center;
  -webkit-box-shadow: 0 8px 0 -6px #fff, 0 8px 0 -5px #e0e0e0;
  box-shadow: 0 8px 0 -6px #fff, 0 8px 0 -5px #e0e0e0;
}
.detail-content-list .album-item .album-info h3 {
  margin-bottom: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  line-height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: #444;
}
.detail-content-list .album-item .album-info p {
  line-height: 17px;
  font-size: 12px;
  color: #777;
}
.detail-content-list .add-album:hover .smbg {
  background-color: #fff5f5;
  border-color: #ffa9a9;
}
.detail-content-list .album-item .album-cover:hover .album-mask {
  opacity: 1;
}
.detail-content-list .album-item:hover .album-info {
  -webkit-box-shadow: 0 8px 0 -6px #fff, 0 8px 5px -5px #e0e0e0;
  box-shadow: 0 8px 0 -6px #fff, 0 8px 5px -5px #e0e0e0;
}
.add_album .el-form-item {
  margin-bottom: 0;
}
</style>