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
import VueNativeSock from 'vue-native-websocket'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueVideoPlayer)
Vue.use(AMap)
Vue.use(VueNativeSock, 'ws://120.24.79.173:1234/', {
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  connectManually: true
})

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
  components: { App },
  methods: {
    sendSocketMsg: function(val) {
      console.log(val);
      // $socket is [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance
      // this.$socket.send('some data')
      // or with {format: 'json'} enabled
      // this.$socket.sendObj({awesome: 'data'})
    }
  }
})
