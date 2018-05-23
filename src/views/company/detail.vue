<template>
  <div class="edit-warp" @click="warpClick">
    <div class="edit-content">
      <!-- 顶部条件与工具栏START -->
      <tool-bar>
        <template slot="left">
          <div class="edit-content-header tag-title">
            <div class="card-img title-logo imgtype1"></div>
            <div class="title">
              <p>详情</p>
            </div>
          </div>
        </template>
        <template slot="right">
          <div class="edit-content-header-rightBtn">
            <ul>
              <li class="backIndex" @click="handleBackIndex">
                <!-- <Icon class='backIndex_icon' type="arrow-return-left"></Icon> -->
                <span class='backIndex_icon'></span>
              </li>
            </ul>
          </div>
        </template>
      </tool-bar>
      <!-- 顶部条件与工具栏END -->
      <!-- 配套 start -->
      <div class="edit-content-body" v-if="tagView.complement" :style="bodyStyle">
        <div class="scroll">
          <div class="c-warp-nodata">
            <div class="icon-nodata"></div> <p>页面正在重构中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '../../common/util'
import API from '../../api/api_book';
import ToolBar from '../../components/ToolBar'

export default {
  name: 'company-detail',
  components: { ToolBar },
  props: {
    routePath: {
      type: String,
      default: '/alarm/index'
    }
  },
  data() {
    return {
      bodyStyle: { height: '100%' },
      tagView: { // tag内容组合
        info: false,
        stage: false,
        team: false,
        complement: true,
        images: false,
        target: false,
      }
    }
  },
  methods: {
    init() {
      var that = this;
      //that.resetTag();
    },
    tagClick(tag) {
      var that = this;
      if(that.tagView[tag] == false){
        that.resetTag();
      }
    },
    resetTag() {
      var that = this;
      for(var key in that.tagView){
        that.tagView[key] = false
      }
    },
    handleBackIndex(){
      var that = this;
      let url = this.routePath
      let id = '12'
      this.$router.push({
        path: url,
        query: {
          "id": id
        }
      });
    },
    warpClick(){
    }
  },
  created() {},
  activated() {
    var that = this;
    that.init();
  },
  watch: {},
  filters: {},
  mounted() {
    this.bodyStyle.height = ((window.innerHeight) - 125) + 'px';
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/styles/_install";
.edit-warp {
  background: $viewBg;
  .edit-content {
    position: relative;
    height: 100%;
    .tag-title {
      min-width: 800px;
      position: relative;
      height: 55px;
      line-height: 50px;
      .title-logo {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        width: 40px;
        vertical-align: middle;
        margin-top: -2px;
        background: url(../../assets/images/customer_icons.png) no-repeat;
        background-position: -441px -836px;
        @include radius(3px)
      }
      .title {
        display: inline-block;
        vertical-align: top;
        height: 40px;
        line-height: 40px;
        p {
          line-height: 32px;
          height: 32px;
          &:first-child {
            font-size: 17px;
            font-weight: bold;
            color: #666;
          }
          ;
        }
        .a-tag {
          margin-right: 30px;
          display: inline-block;
          color: #999;
        }
        .active {
          color: $blue;
          border-bottom: 2px solid $blue;
        }
      }
    }
    /*返回按钮*/
    .edit-content-header-rightBtn{
      display: inline-block;
      vertical-align: top;
      position: absolute;
      right: 5px;
      ul {
        font-size: 0;
        li {
          display: inline-block;
          vertical-align: top;
          font-size: 14px;
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
          cursor: pointer;
          &:hover{
            background-color: #e3e3e3;
          }
          .item_icon{
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            color: #666;
          }
        }
      }
      .backIndex {
        width: 55px;
        text-align: center;
        border-left: 1px solid #ddd;
        .backIndex_icon {
          display: inline-block;
          vertical-align: middle;
          height: 30px;
          width: 30px;
          margin-right: 5px;
          margin-top: -5px;
          font-size: 25px;
          background: url(../../assets/images/icons_case.png) no-repeat  -83px -932px;
        }
      }
    }
    .edit-content-body {
      position: absolute;
      top: 55px;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      overflow: auto;
      background-color: #fff;
      @include overflowCss();
      .scroll {
        min-width: 910px;
      }
    }
  }  
}
.card-img {
  background: $green;
  font-weight: 900;
  @include center(66px);
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 700;
  background: url(../../assets/images/icons_buding.png) no-repeat;
}

</style>