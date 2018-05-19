<template>
  <div class="filter-warp">
    <el-row :gutter="10">
      <el-col :span="18"> <slot name="left"></slot> </el-col>
      <el-col :span="6"> <slot name="right"></slot> </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'toolbar',
  created () {
  }
}
</script>
<style scoped>
/*过滤条件*/
.filter-warp {
  height: 50px;
  position: relative;
  padding-left: 20px;    
  background-color: #f3f3f3;
  border-bottom: 1px solid #bebebe;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  .condition {
    display: inline-block;
    margin-top: 5px;
    margin-right: 1px;
  }
  .condition-status {
    display: inline-block;
    vertical-align: top;
    padding-top: 10px;
  }
}
/*切换列表展示*/
.change-list {
  font-size: 0;
  display: inline-block;
  vertical-align: top;
  height: 49px;
  width: 58px;
  padding-top: 15px;
  text-align: center;
  cursor: pointer;
  float: right;
  .icon {
    display: inline-block;
    vertical-align: top;
    width: 20px;
    height: 20px;
    background: url(../../assets/icons.png) no-repeat;
    &.icon-list {
      background-position: -71px -412px;
    }
    &.icon-card {
      background-position: -71px -440px;
    }
  }
  &.active {
    background-color: #eee;
    .icon {
      &.icon-list {
        background-position: -44px -412px;
      }
      &.icon-card {
        background-position: -44px -440px;
      }
    }
  }
}
</style>