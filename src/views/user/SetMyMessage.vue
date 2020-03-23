<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-row>
        <!-- 头像 -->
        <el-col :span="9" style="height:10px"></el-col>

        <el-col :span="6">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:10010/zuul/api/imgservice/img/upload_head"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>

        <el-col :span="9" style="height:10px"></el-col>
      </el-row>
      <!-- 基本信息 -->

      <el-form
        ref="user"
        :model="user"
        label-width="80px"
        :rules="rules"
        style="margin: 100px 265px 300px 160px;"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
     // { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
        >
          <el-input v-model="user.email"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="updateUserMsg('user')" size="small">保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {updateUserMsg } from '@/api.js'
export default {
  data() {
    return {
      key: true,
      user: {
        imageUrl: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      },

    };
  },
  methods: {
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
    getUserMsg() {
      let user = sessionStorage.getItem("loginUser");
      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.$message.error("请先登录");
      }
    },
    //修改信息
     updateUserMsg(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let {data : result} = await updateUserMsg(this.user);
          
        if(result.code==1){

        sessionStorage.setItem("token", result.data);

        sessionStorage.setItem(
          "loginUser",
          JSON.stringify(result.other.loginUser)
        );

        this.$message.success(result.message);

        location.reload();

        }else{
        this.$message.error(result.message);
        }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.getUserMsg();
  }
};
</script>

<style>
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
</style>