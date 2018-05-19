// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/styles/main.scss'

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import AMap from 'vue-amap'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(VueVideoPlayer)
Vue.use(AMap)

// 初始化高德地图的 key 和插件
AMap.initAMapApiLoader({
  key: '6213e0b54c43b5bdb29f770af41a26bb',
  // 插件集合
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'MarkerClusterer'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
