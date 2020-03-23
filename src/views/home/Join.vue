<template>
<div class="fp-viewing-0" style="overflow: hidden; height: 100%;">
  <div id="content">
    <div
      id="dowebok"
      style="position: relative; z-index: 99; height: 100%; touch-action: none; top: 0px;"
      class="fullpage-wrapper"
    >
      <div
        class="section section1 fp-section fp-table active fp-completely"
        style="position: relative; height: 364px;"
      >
        <div class="fp-tableCell" style="height: 364px;">
          <img
            class="pg-next-page"
            src="@/assets/logo.png"
          />
          <div id="dt-header" style="position: absolute;top: 0;width: 100%;">
            <div class="dt-wrap clr">
              <router-link to="/" id="dt-logo" href="/">堆堆</router-link>
              <div id="dt-header-right">
                <div id="dt-account" class="dt-has-menu dt-head-cat">
                  <router-link to="/" class="dt-account-btn">
                    <img
                      class="dt-avatar"
                      :src="msg.timg"
                    />
                    <div>{{msg.username}}</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;margin-top: -100px;">
            <img
              class="pg-logo"
              src="https://c-ssl.duitang.com/uploads/people/201905/27/20190527154420_a5LMj.png"
            />
            <div class="pg-title">生活不仅是活着，还需要一点仪式感</div>
            <div class="pg-sub-title">／这种认真的生活态度，是感受幸福的条件／</div>
            <a class="to-be-lifer" href="javascript:;">
              <div class="pg-cnt-btn" id="cofirm-to-be-lifer">成为堆糖生活家</div>
            </a>
          </div>
        </div>
      </div>
      <div class="section section2 fp-section fp-table" style="position: relative; height: 364px;">
        <div class="fp-tableCell" style="height: 364px;">
          <img
            class="pg-next-page"
            src="https://c-ssl.duitang.com/uploads/people/201608/19/20160819111313_siBHE.png"
          />
          <div class="pg-cont-wrap">
            <div
              class="pg-mac-img fadeUpS speed2 animate hide"
              style="width: 100%;height: 0;padding-bottom: 67.167%;background: url(https://c-ssl.duitang.com/uploads/people/201608/18/20160818104653_VsaUu.png) no-repeat;background-size: 100% 100%;"
            ></div>
            <div class="pg-mac-cont slowShow speed2 animate hide">
              <div class="pg-line-before"></div>
              <div class="pg-title">研究生活细节&nbsp;&nbsp;分享美好时光</div>
              <div class="pg-content">
                在这里，你可以记录：
                <br />美食烹饪心得、美妆护肤评测；
                <br />影音书观后感、旅行风光游记；
                <br />住家收纳经验、手作心得教程；
                <br />绘画心路历程、铲屎官人日记......
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section3 fp-section fp-table" style="position: relative; height: 364px;">
        <div class="fp-tableCell" style="height: 364px;">
          <img
            class="pg-next-page"
            src="https://c-ssl.duitang.com/uploads/people/201608/19/20160819111313_siBHE.png"
          />
          <div class="pg-cont-wrap">
            <div
              class="pg-mac-img fadeUpS speed2 animate hide"
              style="width: 100%;height: 0;padding-bottom: 122.68%;background: url(https://c-ssl.duitang.com/uploads/people/201608/18/20160818104651_nRwPk.png) no-repeat;background-size: 100% 100%;"
            ></div>
            <div class="pg-mac-cont slowShow speed2 animate hide">
              <div class="pg-line-before"></div>
              <div class="pg-title">有更多人读懂你&nbsp;&nbsp;被堆糖官方推荐</div>
              <div class="pg-content">
                你可能收获：
                <br />人们的关注和喜爱；
                <br />一群志同道合的朋友；
                <br />被推荐至堆堆首页或官方微博微信；
                <br />被编辑发掘，成为达人的机会。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section4 fp-section fp-table" style="height: 364px;">
        <div class="fp-tableCell" style="height: 364px;">
          <div style="text-align: center;">
            <div class="pg-title">“寻找可以在平凡生活里发现不平凡的你们”</div>
            <div class="pg-sub-title">／成为堆堆生活家，开启写作功能，记录美好生活／</div>
            <a class="to-be-lifer" href="javascript:;">
              <div class="pg-cnt-btn" id="cofirm-to-be-lifer">成为堆堆生活家</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <img
      class="pg-to-top"
      src="https://c-ssl.duitang.com/uploads/people/201608/19/20160819182035_F4zHV.png"
    />
  </div>
  <div id="win-house" class="h0"></div>
  <div id="foot-forms" class="dn"></div>

  <div id="fp-nav" class="right" style="margin-top: -43px;">
    <ul>
      <li>
        <a href="#" class="active">
          <span></span>
        </a>
      </li>
      <li>
        <a href="#" class>
          <span></span>
        </a>
      </li>
      <li>
        <a href="#" class>
          <span></span>
        </a>
      </li>
      <li>
        <a href="#" class>
          <span></span>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            msg:{

            }
        }
    },
    created(){
        if(sessionStorage.getItem('username'))
        this.msg.username = sessionStorage.getItem('username')
        if(sessionStorage.getItem('timg'))
        this.msg.timg = sessionStorage.getItem('timg')
    }

};
</script>
<style>
                                                                               
        
</style>