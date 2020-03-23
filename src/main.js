import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/element.js'
import Meta from 'vue-meta';

Vue.use(Meta);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  metaInfo() {
    return {
      title: this.$store.state.metaInfo.title,
      meta: [
        {
          name: "keywords",
          content: this.$store.state.metaInfo.keywords
        }, {
          name: "description",
          content: this.$store.state.metaInfo.description
        }
      ]
    }
  },
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
