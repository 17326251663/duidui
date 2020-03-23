<template>
  <div class="center">
          <h3 class='logo'>JSON SEARCH</h3>
          <el-form v-model="search">
              <el-form-item>
                  <el-input v-model="search.content" class="inpubox">
                          <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-button type="primary" icon="el-icon-search">搜索</el-button>
              </el-form-item>

              <div class="bg"></div>
          </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            search:{}
        }
    }
}
</script>

<style>
.logo{
    text-align: center;
    font-size: 48px;
    text-shadow: #a1a1a1 4px 5px 5px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    padding-bottom: 15px;
}
.inpubox{
    display: inline;
}
.inpubox input{
        width: 80%;
}
.center{
    margin: 200px auto 0px;
    width: 600px;
    text-align: center
}
.el-input__prefix{
    top: -11px;
}
.el-button,.el-input__inner{
    border-radius: 0 !important
}

.bg{
    width: 100%;
    height: 1px;
    /* box-shadow: #a1a1a1 0px -42px 2px 70px; */
    background-color: #a1a1a1;
    border: none;
}

</style>