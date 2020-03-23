<template>
  <div>
      <!-- header -->
        <el-menu class="el-menu-demo header" mode="horizontal">
        <el-menu-item>
            <el-form v-model="search" class="form">
              <el-form-item>
                  <h3 class='logo'>JSON SEARCH</h3>
                  <div class="searchbox">
                      <el-input v-model="search.content" class="inputbox">
                          <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-button type="primary" icon="el-icon-search" size="middle" class="search_button">搜索</el-button>
                  </div>
              </el-form-item>
            </el-form>
        </el-menu-item>
        </el-menu>

        <!-- 正文 -->
        <div class="main">
            <div>
                <h3>正版SA月卡</h3>
                <p>编号【138757】正版SA月卡</p>
                <p>价格:30.00</p>
            </div>
            <div>
                <h3>正版SA月卡</h3>
                <p>编号【138757】正版SA月卡</p>
                <p>价格:30.00</p>
            </div>
            <div>
                <h3>正版SA月卡</h3>
                <p>编号【138757】正版SA月卡</p>
                <p>价格:30.00</p>
            </div>
            <div>
                <h3>正版SA月卡</h3>
                <p>编号【138757】正版SA月卡</p>
                <p>价格:30.00</p>
            </div>
         
        </div>

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
.header{
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
    background-color: #fafafa;
}
.main{
    margin: 100px 0 0 50px;
    width: 1000px;
}

.main div{
    width: 100%;
    height: 100px;
    margin-bottom: 44px;
    border-bottom: #a1a1a1 1px solid;
}

.inputbox{
    display: inline;
}
.inputbox input{
        width: 140%;
}
.el-input__prefix{
    top: -24px;
}
.el-button,.el-input__inner{
    border-radius: 0 !important
}
.el-menu-demo el-menu--horizontal el-menu{
    background-color: #fafafa;
}
.search_button{
    margin-top: 1px;
    padding: 10px 20px;
    background-color: #606266;
    border-color: #606266;
}
.form{
        margin-top: 7px;
}
.logo{
    display: inline-block;
    text-align: center;
    font-size: 18px;
    text-shadow: #a1a1a1 4px 5px 5px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    padding-bottom: 15px;
    margin: 0 20%;
}
.searchbox{
    display: inline-block;
    margin-top: -11px;
}
</style>