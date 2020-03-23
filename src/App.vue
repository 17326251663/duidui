<template>
  <div id="app">
      <div class="go goback" @click="$router.go(-1)">←</div>
      <div class="go goto" @click="$router.go(1)">→</div>
    <router-view/>
  </div>
</template>

<style>
#app{
  height: 100%;
}
body, button, input, select, td, textarea, th {
    font-size: 12px;
    line-height: 1.5;
    font-family: -apple-system-font,PingFang SC,Helvetica Neue,Helvetica,STHeiTi,sans-serif;
    color: #666;
}

/* 版心 */
#content {
    padding-bottom: 80px;
}
#content {
    width: 1000px;
    min-height: 607px;
    margin: 0 auto;
    padding-bottom: 24px;
}
#content, body, html {
    background-color: #fff;
}
#content {
    min-height: 600px;
    margin: 0 auto;
    padding-bottom: 24px;
}
#content {
    width: 1000px;
    margin: 0 auto;
    background-color: #fff;
}
#header {
    margin-bottom: 39px;
    box-shadow: 0 15px 30px rgba(0,0,0,.1)
}
.go{
    padding: 1%;
    width: 50px;
    height: 50px;
    color: #f89090;
    line-height: 16px;
    position: fixed;
    font-size: 20px;
    font-weight: 800;
    background-color: #fafafa;
    border-radius: 50%;
    box-shadow: #a1a1a14a 1px 1px 1px 1px;
    cursor: pointer;
    left: 8%;
}
.goto{
 top: 50%;
}
.goback{
top: 40%;
}
</style>
