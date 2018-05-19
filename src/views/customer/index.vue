<template>
  <div class="app-container company-container">
    <!--顶部操作区域 批量推送消息-->
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container layout-box">客户列表（列表固定标题列和操作列，中间列左右滚动查看）</div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container layout-box">基本信息</div>
          </template>
          <template slot="paneR">
            <div class="bottom-container layout-box">设备实况列表（详情）/摄像头实况列表（详情）</div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'customer',
  components: { splitPane },
  data() {
    return {}
  },
  computed: {
  },
  created() {
  },
  methods: {
    resize() {
      console.log('resize')
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
