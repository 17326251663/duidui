import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'',
    timg:'',
    metaInfo: {
      title: "堆堆图片素材网",
      keywords: "堆堆图片素材网-图片-素材-影视",
      description: "图片-标签-剪辑-摄影-爱好"
  }
  },
  mutations: {
    CAHNGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo;
  }
  },
  actions: {
  },
  modules: {
  }
})
