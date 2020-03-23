<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="condition.type==0">关注</el-breadcrumb-item>
      <el-breadcrumb-item v-else>粉丝</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <div class="follow-wrap">
        <div class="tag-navlist">
          <a :class="`follower-tab ${condition.type==0?'':' cur'}`" @click="changeType(1)">我的粉丝</a>
          <a :class="`followed-tab ${condition.type==0?' cur':''}`" @click="changeType(0)">我的关注</a>
        </div>

        <div class="box rs-plist">
          <div class="cont">
            <ul id="pp-dblist" class="ctr-dblist ctr-dblistpro pp-dblist" v-if="userList.length!=0">
              <li v-for="(v,i) in userList" :key="i">
                <div class="pimg">
                  <router-link :to="`/state?uid=${v.uid}`">
                    <img class="my-people-avatar" :src="v.imageUrl" width="80" height="80" />
                  </router-link>
                </div>
                <div class="th">
                  <router-link
                    :to="`/state?uid=${v.uid}`"
                    class="pp-name"
                    href="/people/?user_id=18091925"
                  >{{v.username}}</router-link>
                  <div class="pp-info">
                    关注
                    <span>{{v.userNum.anum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;粉丝
                    <span>{{v.userNum.fnum}}</span>
                  </div>
                  <div class="pp-desc"></div>
                </div>
              </li>
            </ul>

            <div
              style="padding:100px 0 200px 0;text-align:center;font-size:20px"
              v-else
            >暂无任何{{condition.type==0?'关注':'粉丝'}}~</div>

            <!-- 分页条 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="condition.pageNum"
              :page-sizes="[5, 10, 15, 30]"
              :page-size="condition.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              style="text-align: center;margin-top: 20px;"
              v-if="userList.length!=0"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myCollectOrFans } from "@/api.js";

export default {
  data() {
    return {
      condition: {
        pageNum: 1,
        pageSize: 10,
        uid: 1,
        type: 1
      },
      userList: [],
      total: 10
    };
  },
  methods: {
    changeType(type) {
      this.condition = {
        pageNum: 1,
        pageSize: 10,
        uid: this.$route.query.uid,
        type: type
      };
      this.myCollectOrFans();
    },
    async myCollectOrFans() {
      let { data: result } = await myCollectOrFans(this.condition);
      if (result.code == 1) {
        this.total = result.data.total;
        this.userList = result.data.list;
      }
    },
    //分页
    handleSizeChange(val) {
      this.condition.pageSize = val;
      this.myCollectOrFans();
    },
    handleCurrentChange(val) {
      this.condition.pageNum = val;
      this.myCollectOrFans();
    }
  },
  created() {
    this.changeType(this.$route.query.type);
  }
};
</script>

<style>
.follow-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 20px;
}
.tag-navlist {
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
  width: 160px;
  height: 60px;
  background-color: #fff;
}
.tag-navlist a {
  display: inline-block;
  padding-left: 23px;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #444;
  cursor: pointer;
}

.tag-navlist a.cur {
  color: #ff7e7e;
  background-color: #fcf2f2;
  position: relative;
}
.tag-navlist a.cur::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 10px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  border-radius: 2.5px;
  background-color: #ff7e7e;
}
.rs-plist {
  width: 650px;
}
.ctr-dblist {
  padding-left: 20px;
  border: 1px solid #e0e0e0;
}

.ctr-dblist li:last-child {
  border: none;
}
.ctr-dblist li {
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
  padding: 25px 20px 25px 0;
  border-bottom: 1px solid #d8d8d8;
}

.ctr-dblist li .pimg {
  margin-right: 16px;
}

.ctr-dblist li .th {
  width: 350px;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -moz-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.pimg a {
  float: left;
  padding: 0 3px 7px 0;
  position: relative;
}

.pimg a img {
  border-radius: 50%;
}
.pimg img {
  display: block;
  background-color: #fff;
  border-radius: 50%;
}

.ctr-dblist li .th .pp-name {
  margin-bottom: 4px;
  display: block;
  font-size: 16px;
  color: #444;
  font-weight: 600;
}

.ctr-dblist li .th .pp-info {
  margin-bottom: 4px;
  font-size: 14px;
  color: #444;
}

.ctr-dblist li .th .pp-info {
  margin-bottom: 4px;
  font-size: 14px;
  color: #444;
}

.ctr-dblist li .th .pp-info span {
  display: inline-block;
  margin-left: 4px;
  color: #ff7e7e;
}

.ctr-dblist li .th .pp-info span {
  display: inline-block;
  margin-left: 4px;
  color: #ff7e7e;
}

.ctr-dblist li .th .pp-desc {
  width: 90%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #777;
}
</style>