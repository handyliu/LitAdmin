<template>
  <div class="app-container company-container">
    
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container layout-box">值班人员/巡更记录列表</div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container layout-box">巡更信息</div>
          </template>
          <template slot="paneR">
            <div class="bottom-container layout-box">处理报警记录列表（详情查看报警记录）</div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'patrol',
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
