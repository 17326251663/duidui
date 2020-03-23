<template>
  <div>
    <div style="text-align: center;background-color:rgba(244, 67, 54, 0.03);padding:20px">
      <img src="@/assets/logo.png" alt="堆堆" />
      <div style="margin: 20px auto;">
        <el-radio-group v-model="result" size="small">
          <el-radio-button label="1">注册</el-radio-button>
          <el-radio-button label="2">登录</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--  -->
    <div v-if="result==1">
      <el-steps
        :active="active"
        finish-status="success"
        style="margin-top:50px;width:70%;margin:20px auto"
      >
        <el-step title="开启堆堆之路"></el-step>
        <el-step title="完善注册信息"></el-step>
        <el-step title="选择你的喜好"></el-step>
      </el-steps>
      <!-- 第一步 -->
      <div v-if="active==0">
        <h3 align="center">亲爱的堆堆用户：</h3>
        <p align="center">根据相关法律法规，您需要完成手机号验证才能正常使用堆糖的发布图片、文章和评论等功能哦。</p>
        <!-- 表单 -->
        <el-form
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm form"
          :model="user"
        >
          <el-form-item label="请输入手机号" prop="telephone">
            <el-input v-model="user.telephone" class="telephone"></el-input>
          </el-form-item>
          <el-form-item label="请输入验证码" prop="code">
            <el-input v-model="user.code" style="display: inline;margin-right: 4%;" class="code"></el-input>
            <el-button type="danger" size="mini" @click="sendCode">获取短信验证码</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 第二步 -->
      <div v-if="active==1" class="two">
        <el-form label-width="80px" :rules="rules2" ref="ruleForm2" :model="user">
          <p align="center" style="color:pink">欢迎来到堆堆</p>
          <!-- 头像 -->
          <el-upload
            round
            class="avatar-uploader"
            action="http://47.103.12.222:10010/zuul/api/imgservice/img/upload_head"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            size="mini"
          >
            <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <el-form-item label="用户名称" prop="username">
            <el-input v-model="user.username" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="填写密码" prop="password">
            <el-input v-model="user.password" show-password size="mini" placeholder="密码一旦确定无法修改,请谨慎填写~"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 第三步 -->
      <div v-if="active==2">
        <h3 align="center" style="color:pink;margin-bottom:30px">堆堆有许多有趣的人和事物，请选择你感兴趣的类别，我们将为你推送优质内容。</h3>

        <el-row>
          <el-col
            :span="4"
            :offset="2"
            v-for="(v,i) in categoryList"
            :key="i"
            style="margin-bottom:20px"
          >
            <div>
              <el-checkbox v-model="user.likeMCategory" :label="v.cid">{{v.cname}}</el-checkbox>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-button
        style="margin-top: 12px;margin: auto;display: block;"
        @click="next"
        center="middle"
        type="txt"
        size="mini"
        v-if="active<2"
      >下一步</el-button>

      <el-button
        style="margin-top: 12px;margin: auto;display: block;"
        @click="registry"
        center="middle"
        type="txt"
        size="mini"
        v-else
      >完成</el-button>
    </div>
    <!-- 登录 -->
    <div v-if="result==2">
      <h2 style="color:pink" align='center'>点击跳转到主页进行登录哦~ <a href="/home" style="color:#f6a2b1;line-height: 240px;">点我去主页~</a></h2>
    </div>
  </div>
</template>

<script>
import { selectAllCategory, registry, sendCode, verifyCode } from "@/api.js";
export default {
  data() {
    return {
      user: {
        telephone: "",
        imageUrl: "",
        telephone: "",
        likeMCategory: [],
        code: ""
      },

      active: 0,
      result: "1",
      rules: {
        telephone: [
          { required: true, message: "请输入用户手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在6个字符", trigger: "blur" }
        ]
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在1~10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5~20个字符", trigger: "blur" }
        ]
      },
      categoryList: []
    };
  },
  methods: {
    async next() {
      if (this.active == 0) {
        let telephone = this.user.telephone;

        if (!/^[0-9]{11}$/.test(telephone)) {
          this.$message.info("请输入正确的手机号格式(11位数字)");
          return;
        }

        if (this.user.code == "") {
          this.$message.error("请先输入验证码");
          return;
        }
        //首先验证验证码是否正确
        let { data: result } = await verifyCode(
          this.user.telephone,
          this.user.code
        );

        if (result.code == "0") {
          this.$message.error(result.message);
          return;
        }

        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (this.active++ > 2) this.active = 0;
          }
        });
      } else if (this.active == 1) {
        this.$refs.ruleForm2.validate(valid => {
          if (valid) {
            this.active++;
          }
        });
      }
    },
    // 用户头像
    handleAvatarSuccess(res, file) {
      console.log(res);

      if (res.code == "1") {
        this.user.imageUrl = res.message;
      } else {
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //列出所有分类
    async selectAllCategory() {
      let { data: result } = await selectAllCategory();
      if (result.code == "1") this.categoryList = result.data;
    },
    //发送验证码
    async sendCode() {
      let telephone = this.user.telephone;

      if (!/^[0-9]{11}$/.test(telephone)) {
        this.$message.info("请输入正确的手机号格式(11位数字)");
        return;
      }

      let { data: result } = await sendCode(telephone);
      if (result.code == "1") this.$message.success(result.message);
      else this.$message.error(result.message);
    },
    //注册用户
    async registry() {
      let { data: result } = await registry(this.user);
      if (result.code == "1") {
        this.active = 2;
        this.$message.success(result.message);
        localStorage.setItem("token", result.data);
        //进度条初始化
        this.active=0;
        //数据初始化
        this.user={
        telephone: "",
        imageUrl: "",
        telephone: "",
        likeMCategory: [],
        code: ""
      }
        //跳转到登录界面
        this.result = 2
      } else {
        this.$message.error(result.message);
      }
    }
  },
  created() {
    this.selectAllCategory();
  }
};
</script>

<style>
.two {
  margin: auto;
  width: 400px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #ff7e7e;
  border-color: #ff7e7e;
  -webkit-box-shadow: -1px 0 0 0#ff7e7e;
  box-shadow: -1px 0 0 0#ff7e7e;
}
.form {
  width: 35%;
  margin: 35px auto;
}
.form input {
  height: 30px;
}
.code input {
  width: 40%;
}
.avatar-uploader .el-upload {
  margin-left: 40%;
  border-radius: 50%;
}
.avatar {
  width: 100px;
  height: 100px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>