<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import BMap from 'BMap'

export default {
  props: {
    className: {
      type: String,
      default: 'map'
    },
    id: {
      type: String,
      default: 'comap'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeDestroy() {
    if (!this.map) {
      return
    }
    // this.map.dispose()
    this.map = null
  },
  methods: {
    initMap() {
      this.map = new BMap.Map(this.id)
      var point = new BMap.Point(104.075796, 30.659684)
      this.map.centerAndZoom(point, 14)
      this.map.addControl(new BMap.MapTypeControl())
      this.map.enableScrollWheelZoom(true)
      this.map.enableDoubleClickZoom(true)
      var marker = new BMap.Marker(point)
      this.map.addOverlay(marker)
    }
  }
}
</script>
