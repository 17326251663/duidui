<template>
  <div>
    <div style="
    position: fixed;
    width: 100%;
    z-index: 999;
    top: 0;">
      <!-- 导航栏 -->
      <el-menu class="el-menu-demo nav" mode="horizontal" id="header" router>
        <el-menu-item>
          <a id="dt-logo" href="/">堆堆</a>
        </el-menu-item>
        <!-- 分类 -->
        <el-menu-item>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              分类
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- 卡片 -->
              <el-dropdown-item divided>
                <img src="@/assets/logo.png" alt />
                <img src="@/assets/logo.png" alt />
                <br />
                <el-row class="category">
                  <el-col :span="6" v-for="(v,i) in categoryList" :key="i" style>
                    <router-link :to="`/imgCategory?id=${v.cid}&name=${v.cname}`">{{v.cname}}</router-link>
                  </el-col>
                </el-row>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>

        <el-menu-item>
          <!-- 搜索框 -->
          <div id="dt-search">
            <form action="/search/">
              <input
                class="ipt"
                id="kw"
                autocomplete="off"
                v-model="content"
                type="text"
                placeholder="搜索感兴趣的内容"
                @keydown.enter="$router.push(`/s_img?search=${content}&type=1`)"
              />
              <router-link :to="`/s_img?search=${content}&type=1`">
                <el-button type="submit" icon="el-icon-search"></el-button>
              </router-link>
            </form>
          </div>
        </el-menu-item>
        <!-- 登录显示 -->
        <el-menu-item v-if="msg.username!=''">
          <el-dropdown>
            <el-button type="danger" icon="el-icon-plus" round size="mini" class="publish">发布</el-button>
            <!-- 下拉 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button
                  type="text"
                  class="select"
                  icon="el-icon-picture"
                  @click="dialogVisible=true"
                >上传图片</el-button>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <el-button type="text" class="select" icon="el-icon-tickets">发布文章</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" class="select" icon="el-icon-video-play">发布视频</el-button>
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <!-- 大背景页 -->
        <el-menu-item :class="msg.username==''?'right button':'button'">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">赞助我们</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <img
                  src="http://img.redyu.run/Fgp0UvZWgqn5SGP9yZMGsH7uaHaw"
                  style="width:200px"
                  alt="赞助我们"
                />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item index="/news" class="button" v-if="msg.username!=''">
          <el-badge :value="news" :max="99" class="item">
            <span>消息</span>
          </el-badge>
        </el-menu-item>
        <!-- 未登录显示 -->
        <el-menu-item class="button" @click="dialogFormVisible=true" v-if="msg.username==''">登陆/注册</el-menu-item>
        <!-- 登陆后显示 -->
        <el-menu-item class="button" v-else>
          <el-dropdown>
            <router-link :to="`/state?uid=${msg.uid}`">
              <div>
                <el-avatar :size="35" :src="msg.imageUrl" class="headimg"></el-avatar>
                <span>{{msg.username}}</span>
              </div>
            </router-link>
            <!-- 下拉 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="`/state?uid=${msg.uid}`">
                  <el-button type="text" class="select" icon="el-icon-user">个人中心</el-button>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/setMyMsg">
                  <el-button type="text" class="select" icon="el-icon-setting">账号设置</el-button>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" class="select" icon="el-icon-switch-button" @click="loginout">退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 分隔栏 -->
    <div style="margin-bottom:100px"></div>

    <!-- 版心 -->
    <div id="content">
      <!-- 广告栏 -->
      <div class="app-download-guide top" style="margin-bottom: 20px;text-align: center;">
        <!-- <img src="@/assets/lg.png" alt style="width: 1000px;" /> -->
      </div>
      <!-- 主要展示页面 -->
      <router-view></router-view>
    </div>
    <!-- 页脚 -->
    <div id="footer" class="footer">
      <div class="footcont">
        <div class="footwrap">
          <div class="dt-footer-frdlk">
            <a>标签集</a>
            <a id="sitehelp">帮助中心</a>
            <a>关于我们</a>
            <a>加入我们</a>
            <a>免责声明</a>
            <a>隐私协议</a>
            <a>注册协议</a>
          </div>
          <div class="dt-footer-text">
            <span class="dt-footer-icp">
              ©2020 ***.com 版权所有。
              <a>沪ICP备66666666号-6</a>
            </span>
            <div class="report-wrap">
              <a class="report" href="http://www.shjbzx.cn" target="_blank">上海市互联网违法和不良信息举报中心</a>
              <span class="report-phone">有害内容举报电话：000-000000</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹出登录 -->
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-row>
        <!-- 左边登录 -->
        <el-col :span="16">
          <div class="left_login_form">
            <el-form :model="user">
              <el-form-item label="手机号:" :label-width="formLabelWidth">
                <el-input v-model="user.telephone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="输入密码:" :label-width="formLabelWidth">
                <el-input v-model="user.password" autocomplete="off" show-password></el-input>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth">
                <el-button @click="login" type="danger" style="width:100%">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <!-- 右边漫图 -->
        <el-col :span="8">
          <div>
            <img src="@/assets/logo.png" alt style="margin: 25% 0 0 7%;width: 200px;" />
          </div>
          <div style="text-align:center;color:pink">堆堆 专业图片素材网站</div>
        </el-col>
      </el-row>
      <div style="padding-left: 40%;">
        <router-link to="/registry">还没有账号?立即注册</router-link>
      </div>
    </el-dialog>
    <!-- 发布图片弹出框 -->
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="43%" :before-close="handleClose">
      <!-- 图片 -->
      <el-upload
        action="http://localhost:10010/zuul/api/imgservice/img/upload_head"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="aaa"
        :limit="9"
        ref="upload"
        id="q1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <!-- 判断图片列表是否为空 -->
      <div v-if="imgList.length!=0">
        <br />

        <p style="color:pink;margin-top:10px">尚未创建专辑?点击下面进行创建吧</p>
        <br />
        <!-- 创建专辑 -->
        <el-form :inline="true">
          <el-form-item label="创建专辑">
            <el-input type="text" v-model="aname" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="addAlbum" size="mini">创建专辑</el-button>
          </el-form-item>
        </el-form>

        <el-form ref="form" v-model="send">
          <el-form-item label="添加至专辑">
            <el-select v-model="send.aid" placeholder="请选择" size="mini">
              <el-option
                v-for="(item,i) in albumList"
                :key="i"
                :label="item.aname"
                :value="item.aid"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-input
            type="textarea"
            placeholder="为图片添加合适的描述,字数限制300字"
            v-model="send.info"
            resize="false"
            maxlength="20"
          ></el-input>
          <!-- 添加tag标签 -->
          <br />
          <br />
          <el-form-item label="添加标签">
            <el-tag
              :key="tag"
              v-for="tag in send.tags"
              closable
              type="danger"
              :disable-transitions="false"
              @close="handleCloses(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button
              v-if="send.tags.length<=3&&!inputVisible"
              class="button-new-tag"
              size="small"
              @click="showInput"
            >+ New Tag</el-button>
          </el-form-item>
          <p align="center">
            <el-button type="danger" @click="addimage">发布</el-button>
          </p>
        </el-form>
        <hr style="border-color: #fafafa47;" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectAllCategory,
  login,
  addAlbum,
  selectAllAlbum,
  addimage,
  lookUnreadReview 
} from "@/api.js";
export default {
  data() {
    return {
      content: "",
      categoryList: [],
      //表单文字间距
      formLabelWidth: "120px",
      //弹出层开关
      dialogFormVisible: false,
      dialogVisible: false,
      dialogVisible2: false,
      user: {},
      msg: {
        username: "",
        timg: ""
      },
      imgList: [],
      send: {
        tags: []
      },
      //专辑名称
      aname: "",
      albumList: [],
      //标签
      inputVisible: false,
      inputValue: "",
      //消息
      news:''
    };
  },
  methods: {
    async selectAllCategory() {
      let { data: result } = await selectAllCategory();
      if (result.code == "1") this.categoryList = result.data;
    },
    async login() {
      let { data: result } = await login(this.user);
      if (result.code == "1") {
        sessionStorage.setItem("token", result.data);
        this.msg = result.other.loginUser;
        this.dialogFormVisible = false;

        sessionStorage.setItem(
          "loginUser",
          JSON.stringify(result.other.loginUser)
        );

        this.$message.success(result.message);
        this.user = {}
        this.lookUnreadReview()
        location.reload()
      } else {
        this.$message.error(result.message);
      }
    },
    //关闭弹出框询问
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //新增专辑
    async addAlbum() {
      let { data: result } = await addAlbum(this.aname);
      if (result.code == "1") {
        this.$message.success(result.message);
        this.aname = "";
        this.selectAllAlbum();
      } else {
        this.$message.error(result.message);
      }
    },
    async selectAllAlbum() {
      let { data: result } = await selectAllAlbum();
      if (result.code == "1") {
        this.albumList = result.data;
      }
    },
    //图片
    handleRemove(file, fileList) {
      this.imgList = fileList.map(v => v.response.message);
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogVisible2 = true;
    },
    aaa(response, file, fileList) {
      this.imgList.push(response.message);
      if (this.imgList.length >= 2) this.dialogVisible2 = false;
    },
    //添加标签栏
    handleCloses(tag) {
      this.send.tags.splice(this.send.tags.indexOf(tag), 1);
    },
    //添加图片
    async addimage() {
      this.send.dataurl = this.imgList;
      let { data: result } = await addimage(this.send);
      if (result.code == "1") {
        this.send = {
          tags: []
        };
        this.imgList = [];
        this.$message.success(result.message);
        this.dialogVisible = false;
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error(result.message);
      }
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
        this.send.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //查看未读评论
    async lookUnreadReview(){
      let {data : result} = await lookUnreadReview()
      if(result.code==1){
        if(result.data!=0){
          this.news = result.data
        }else{
          this.news = ''
        }
      }
    },
    //退出
    loginout(){
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('loginUser')
          this.msg = {
            username:""
          }
          this.$router.push('/')
        }).catch(() => {
                 
        });
    }
  },
  created() {

    this.selectAllCategory();
    let login = JSON.parse(sessionStorage.getItem("loginUser"));
    if (login)
    {this.msg = login;
        //查询未读信息
           this.lookUnreadReview()
          setTimeout(() => {
        this.lookUnreadReview()
      }, 60000);
    }
    //查询所有专辑
    this.selectAllAlbum();

    // 填充搜索框
    if (this.$route.query.search) {
      this.content = this.$route.query.search;
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route(to, from) {
      if (this.$route.query.search) {
        this.content = this.$route.query.search;
        let history = localStorage.getItem("history");
        if (history) {
          history = JSON.parse(history);

          if (history.length >= 10) history.pop();

          for (let i = 0; i < history.length; i++) {
            if (history[i] == this.$route.query.search) {
              history.splice(i, 1);
              i--;
            }
          }
          history.unshift(this.$route.query.search);
        } else {
          history = [this.$route.query.search];
        }
        localStorage.setItem("history", JSON.stringify(history));
      }
    }
  }
};
</script>

<style>
.right {
  margin-left: 10% !important;
}
.nav {
  padding: 5px 0 5px 16%;
  box-sizing: border-box;
}

.button:hover {
  background-color: #f5f5f5 !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #409eff00;
  color: #303133;
}

#dt-search .el-icon-search {
  position: absolute;
  top: 8px;
  left: 10px;
  color: white;
}
.category {
  width: 300px;
}

#dt-search form {
  width: 262px;
  height: 30px;
  border-radius: 20px;
}

#dt-search form input {
  padding: 0 4px 0 10px;
  width: 220px;
  height: 30px;
  line-height: 30px;
  border: 0 none;
  border-radius: 20px;
  position: absolute;
  top: 0;
  outline: none;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: black !important;
}

.ipt {
  width: 180px;
  height: 25px;
  line-height: 21px;
  padding: 3px 2px 0 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #d4d4d4;
  font-size: 12px;
}
#dt-search form button {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 42px;
  height: 31px;
  outline: 0;
  border: 0 none;
  background-color: #ff7e7e;
  background-position: -143px -3px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
}

#dt-search {
  float: left;
  margin-left: 40px;
  margin-top: 16px;
  border: 1px solid #ff7e7e;
  border-radius: 20px;
  position: relative;
  z-index: 900;
}

#dt-logo {
  float: left;
  width: 85px;
  height: 64px;
  background-image: url("../assets/logo.png");
  background-position: 0 12px;
  background-repeat: no-repeat;
  background-position: -22px 0;
  text-indent: -9999px;
}
a:link,
a:visited {
  text-decoration: none;
  color: #5678a0;
}
a:link,
a:visited {
  color: #5678a0;
  text-decoration: none;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #ecf5ff00 !important;
  color: #ffffff;
}
.category div {
  text-align: center;
  color: #909399;
}
.category div:hover {
  color: rgb(126, 172, 219);
  background-color: #fafafa;
}
/* 弹出登录框样式 */
.el-dialog__header {
  border-bottom: 1px solid #ebebeb;
  font-weight: 600;
  text-align: center;
}
.el-dialog__title {
  color: #606060;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #909399;
  font-weight: 800;
  font-size: 25px;
}
/* 左登录框 */
.left_login_form {
  padding: 10px 10px 100px 10px;
  border-right: #dddddd 1px solid;
  margin-bottom: 20px;
}

.left_login_form form {
  padding: 30px 90px 0 0;
}

.publish .el-icon-plus {
  color: white;
  padding: 0;
  margin: 0;
}
.headimg {
  margin-right: 5%;
}
.select {
  color: #606060;
}
.select i {
  color: pink;
}
.el-dropdown-menu__item:hover {
  background-color: #909399;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
#footer {
  overflow: hidden;
  margin: 0 auto;
}
.footer .footcont {
  overflow: hidden;
  width: 100%;
  height: 68px;
  color: #fff;
  background-color: #555;
  margin-top: 53px;
}
.footer .footwrap {
  width: 1100px;
  margin: 0 auto;
}
.footer .dt-footer-frdlk {
  float: right;
  padding: 16px 0 0 10px;
  overflow: hidden;
}
.footer .dt-footer-frdlk a:link,
.footer .dt-footer-frdlk a:visited {
  float: right;
  line-height: 36px;
  padding: 0 8px;
  color: #fff;
}
.footer .dt-footer-text {
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
  -webkit-box-align: right;
  -webkit-align-items: right;
  -moz-box-align: right;
  -ms-flex-align: right;
  align-items: right;
  margin-right: 5px;
  text-align: center;
  white-space: nowrap;
}
.footer .dt-footer-icp {
  float: left;
  margin: 16px 0 0;
}
.dt-footer-icp {
  font-size: 12px;
  color: #fff;
}
.dt-footer-icp a:link,
.dt-footer-icp a:visited {
  color: #fff;
}
.footer .dt-footer-text .report {
  padding-right: 5px;
  color: #fff;
}
.footer .dt-footer-text .report-phone {
  padding-left: 8px;
  white-space: nowrap;
  border-left: 1px solid #fff;
}
.footer .dt-footer-frdlk a:link,
.footer .dt-footer-frdlk a {
  float: right;
  line-height: 36px;
  padding: 0 8px;
  color: #fff;
}
.el-badge__content.is-fixed{
top:15px;
}
</style>