<template>
  <div class="app-container company-container">
    <!--顶部应该加按钮操作区域 解绑/推送消息-->
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container layout-box">设备列表</div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container layout-box">
              <!-- 地图位置（位置/简介/接警次数） -->
              <el-amap
                vid="amapDemo"
                :center="center"
                :zoom="zoom"
                class="amap-demo"
                :events="events">
                <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>
              </el-amap>
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container layout-box">设备基本信息/传感器列表</div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
/* eslint-disable */
import splitPane from 'vue-splitpane'

export default {
  name: 'device',
  components: { splitPane },
  data() {
    let self = this
    return {
      zoom: 12,
      center: [121.59996, 31.197646],
      markers: [],
      markerRefs: [],
      events: {
        init(o) {
          setTimeout(() => {
            console.log(self.markerRefs);
            let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
              gridSize: 80,
              renderCluserMarker: self._renderCluserMarker
            });
            console.log(cluster);
          }, 1000);
        }
      }
    }
  },
  computed: {
  },
  created() {
    let self = this
    let markers = []
    let index = 0
    let basePosition = [121.59996, 31.197646]

    while (++index <= 30) {
      markers.push({
        position: [basePosition[0] + 0.01 * index, basePosition[1]],
        content: '<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        events: {
          init(o) {
            self.markerRefs.push(o)
          }
        }
      });
    }

    this.markers = markers
  },
  methods: {
    resize() {
      console.log('resize')
    },
    _renderCluserMarker(context) {
      const count = this.markers.length;

      let factor = Math.pow(context.count/count, 1/18)
      let div = document.createElement('div');
      let Hue = 180 - factor* 180;
      let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
      let fontColor = 'hsla('+Hue+',100%,20%,1)';
      let borderColor = 'hsla('+Hue+',100%,40%,1)';
      let shadowColor = 'hsla('+Hue+',100%,50%,1)';
      div.style.backgroundColor = bgColor
      let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
      div.style.width = div.style.height = size+'px';
      div.style.border = 'solid 1px '+ borderColor;
      div.style.borderRadius = size/2 + 'px';
      div.style.boxShadow = '0 0 1px '+ shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size+'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
      context.marker.setContent(div)
    }
  }
}
</script>

<style scoped>
  .company-container {
    position: relative;
    height: 100vh;
  }

  .left-container {
    height: 100%;
  }

  .right-container {
    height: 200px;
  }

  .top-container {
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    height: 100%;
  }
</style>
