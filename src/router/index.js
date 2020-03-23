import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/jx_image',
    metaInfo: {
    title: "首页-堆堆图片素材网",
    keywords: "堆堆图片素材网-图片-素材-影视",
    description: "图片-标签-剪辑-摄影-爱好-精选图片"
    }
  },{
    path: '/registry',
    name: 'registry',
    component: () => import('../views/registry/Registry.vue'),
    metaInfo: {
      title: "注册-堆堆图片素材网",
      keywords: "堆堆图片素材网-图片-素材-影视",
      description: "图片-标签-剪辑-摄影-爱好"
  }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path:"/imageMsg",
        name:"imageMsg",
        metaInfo: {
          title: "图片信息-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      },
        component: () => import('../views/imageMsg/ImageMsg.vue')
      },
      {
        path:'/home',
        name:'home',
        component: () => import('../views/home/Home.vue'),
        children:[
         {
          path:'/jx_image',
          name:'jx_image',
          component: () => import('../views/home/router/Jx_image.vue'),
          metaInfo: {
            title: "精选图片-堆堆图片素材网",
            keywords: "堆堆图片素材网-图片-素材-影视",
            description: "图片-标签-剪辑-摄影-爱好"
        }
         }
        ]
      },
      {
        path:'/personal',
        name:'personal',
        component: () => import('../views/user/Personal.vue'),
        children:[
          {
            path:'/state',
            name: 'state',
            component: () => import('../views/user/router/State.vue'),
            metaInfo: {
              title: "用户动态-堆堆图片素材网",
              keywords: "堆堆图片素材网-图片-素材-影视",
              description: "图片-标签-剪辑-摄影-爱好"
          }
          },
          {
            path:'/album',
            name: 'album',
            component: () => import('../views/user/router/Album.vue'),
            metaInfo: {
              title: "用户专辑列表-堆堆图片素材网",
              keywords: "堆堆图片素材网-图片-素材-影视",
              description: "图片-标签-剪辑-摄影-爱好"
          }
          },
          {
            path:'/collect',
            name: 'collect',
            component: () => import('../views/user/router/Collect.vue'),
            metaInfo: {
              title: "关注-堆堆图片素材网",
              keywords: "堆堆图片素材网-图片-素材-影视",
              description: "图片-标签-剪辑-摄影-爱好"
          }
          },
        ]
      },
      {
        path:'/albumMsg',
        name:"album",
        component: () => import('../views/user/AlbumMsg.vue'),
        metaInfo: {
          title: "专辑信息-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      }, 
      {
        path:'/imgCategory',
        name: 'imgCategorylbum',
        component: () => import('../views/imageMsg/ImgCategory.vue'),
        metaInfo: {
          title: "图片分类-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      },
      {
        path:'/s_img',
        name: 's_img',
        component: () => import('../views/search/ImageList.vue'),
        metaInfo: {
          title: "搜索结果-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      },
      {
        path:'/setMyMsg',
        name: 'setMyMsg',
        component: () => import('../views/user/SetMyMessage.vue'),
        metaInfo: {
          title: "设置个人信息-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      },
      {
        path:'/news',
        name: 'news',
        component: () => import('../views/imageMsg/News.vue'),
        metaInfo: {
          title: "我的消息-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      },
      {
        path:'/userCollect',
        name: 'userCollect',
        component: () => import('../views/user/UserCollect.vue'),
        metaInfo: {
          title: "用户互动关注-堆堆图片素材网",
          keywords: "堆堆图片素材网-图片-素材-影视",
          description: "图片-标签-剪辑-摄影-爱好"
      }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{

  if (to.meta.metaInfo)
  store.commit("CAHNGE_META_INFO", to.meta.metaInfo)

    if(to.path!='/album'&&to.path!='/state'&&to.path!='/collect'){
       // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
          // safari
    window.pageYOffset = 0
    }

    next()

})

export default router
