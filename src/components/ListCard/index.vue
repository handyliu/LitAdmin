<template>
  <div class="component-warp">
    <ul class="card-list">
      <li v-for="(item,index) in list" @click="routeGo(item.id)">
        <div class="card-icon" 
          @click.stop="openDelModal(item.id)"> 
          <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
            <i class="ico hide icon-delete"></i>
          </el-tooltip>
        </div>
        <el-row>
          <el-col :span="6" class="card-img" :class="'imgtype'+item.type"></el-col>
          <el-col :span="18">
            <p class="card-title" :title="item.name">{{item.name}}</p>
            <p class="card-stages"><i class="icon"></i>分期：<span :title="item.stageName">121</span></p>
            <div class="card-mes">
              <span><i class="icon iconType1"></i>test</span>
              <span><i class="icon iconType2"></i>sdfsdf</span>
              <span><i class="icon iconType3"></i>共12栋</span>
            </div>
          </el-col>
        </el-row>
      </li>
    </ul>
    <!-- 暂无数据 -->
    <div v-if="nodata" class="noVersion">
      <div><i class="ico icon-version"></i></div>
      <p>暂无数据，请点击右上角的【+新增{{title}}】</p>
    </div>
  </div>
</template>
<script>
import util from '@/common/util'
  
export default {
  name: 'ListCard',
  data() {
    return {
      nodata: false, //列表无数据
    }
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    routePath: {
      type: String,
      default: '404'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    init() {
      // 初始化列表数据
    },
    // 路由跳转
    routeGo(id) {
      let url = this.routePath
      this.$router.push({
        path: url,
        query: {
          "id": id
        }
      });
    },
    // 删除
    openDelModal(id) {
      this.$emit('openDelModal', id)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/styles/_install";
.component-warp {
  position: absolute;
  top: 10px;
  bottom: 0;
  overflow: auto;
  @include overflowCss();

  .card-list {
    padding: 20px 0 0 20px;
    &>li {
      display: inline-block;
      padding: 16px 20px;
      border: 1px solid $borderel-color;
      width: 352px;
      height: 124px;
      background: #fff;
      margin: 0 20px 15px 0;
      position: relative;
      transition: all .15s linear;
      cursor: pointer;
      &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -2px, 0);
        .hide {
          display: inline-block;
        }
      }
    }
    .card-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2;
    }
    .card-title {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      height: 32px;
      line-height: 45px;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
    }
    .card-tag {
      border: 0;
      background: #e9f8ed;
      el-color: $green;
      line-height: 22px;
      float: left;
    }
    .card-stages {
      font-weight: 700;
      el-color: #98999b;
      height: 22px;
      line-height: 28px;
      width: 200px;
      font-weight: normal;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        background: url(../../assets/images/icons.png) no-repeat -422px -995px;
      }
    }
    .card-mes {
      float: left;
      width: 270px;
      line-height: 28px;
      el-color: #98999b;
      span {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        ;
      }
      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        background: url(../../assets/images/icons_buding.png) no-repeat;
      }
      .iconType1 {
        background-position: -397px -26px;
      }
      .iconType2 {
        background-position: -397px -63px;
      }
      .iconType3 {
        background-position: -397px -97px;
      }
    }
    .card-img {
      background: $green;
      font-weight: 900;
      @include center(66px);
      el-color: #fff;
      border-radius: 5px;
      margin-right: 10px;
      margin-top: 11px;
      font-size: 18px;
      font-weight: 700;
      background: url(../../assets/images/icons_buding.png) no-repeat;
    }
    /*1.住宅*/
    .imgtype1 {
      background-position: -41px -121px;
    }
    /*2.公寓*/
    .imgtype2 {
      background-position: -476px -388px;
    }
    /*3.别墅*/
    .imgtype3 {
      background-position: -41px -23px;
    }
    /*4.商业*/
    .imgtype4 {
      background-position: -41px -218px;
    }
    /*5.储藏室*/
    .imgtype5 {
      background-position: -476px -25px;
    }
    /*6.地下室*/
    .imgtype6 {
      background-position: -476px -116px;
    }
    /*6.车库*/
    .imgtype7 {
      background-position: -476px -205px;
    }
    /*8.车位*/
    .imgtype8 {
      background-position: -476px -296px;
    }
    .card-disabled {
      .card-img {
        background: #ccc;
      }
      .card-tag {
        background: #e5e5e5;
        el-color: #919191;
      }
      .card-title {
        el-color: #9a9a9a;
      }
    }
  }
  .span_addIcon {
    font-size: 20px;
    margin-top: -5px;
    margin-left: -2px;
    display: inline-block;
    vertical-align: middle;
  }
  .noVersion {
    min-width: 800px;
    text-align: center;
    position: absolute;
    top: 40%;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    el-color: #7d7d7d;
    .icon-version {
      cursor: default;
    }
  }
  .demo-spin-div {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100px;
    margin-top: -100px;
  }
  .demo-spin-el-col {
    position: absolute;
    top: 0;
    left: 50%;
    width: 200px;
    height: 100px;
    text-align: center;
    margin-left: -100px;
    box-shadow: 0 0 8px #ddd;
    border-radius: 3px;
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>