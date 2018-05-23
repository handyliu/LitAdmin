<template>
  <div class="condition-warp">
    <div class="condition-show">
      <span>筛选</span><i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow "></i>
    </div>
    <div class="condition-down" :style="width?'width:'+width:''">
      <div class="condition-down-items" @click.stop="warpClick" v-for="(item,index) in list" :key="index">
        <div class="condition-down-title">{{item.title}}</div>
        <div class="condition-down-content">
          <ul>
            <li v-for="(litem,lindex) in item.item" :key="lindex">
              <!-- <input :type="item.multiple?'checkbox':'radio'" class="condition-down-checkbox" :value="litem.id" :id="item.name + lindex"> -->
              <label v-bind:class="{'checked': litem.checked }" :for="item.name + lindex" :title="litem.name" @click.stop="handleChoose(item,litem)">{{litem.name}}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/common/util'

export default {
  name: 'FilterOther',
  data() {
    return {
    }
  },
  props: {
    width: {
      type: String,
      default: '300px'
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    // props例子
    /*list: [
      {
        'title':'奖金单类型',
        'id': [-1],
        'name': 'bonusType',
        'multiple':true,// 是否是多选，如果是多选，上面id的类型就要变成数组
        'item':[
          {'id':-1,'name':'不限'},
          {'id':1,'name':'标准'},
          {'id':2,'name':'跳点'},
          {'id':3,'name':'溢价'},
          {'id':4,'name':'保证金'},
          {'id':5,'name':'预发'},
          {'id':6,'name':'年底'},
          {'id':7,'name':'交房'},
          {'id':8,'name':'特殊'},
        ]
      },
    ]*/
  },
  methods: {
    init() {
      this.list.map((item, index) => {
        item.item.map((sub_item, index1) => {
          this.$set(this.list[index]['item'][index1], 'checked', false);
          // if(sub_item.id == -1 && item.multiple) sub_item.checked = true;
          if (sub_item['Id'] || sub_item['Id'] == 0) sub_item.id = sub_item['Id'];
          if (sub_item.id == item.id[0]) sub_item.checked = true;
          if (item.multiple) sub_item.selected = []
        })
      })
    },
    handleChoose(parent, child) {
      // 单选 TODO 待完善
      if (!parent.multiple) {
        parent.item.map((i) => {
          i.checked = false;
        })
        child.checked = true;
        parent.id[0] = child.id;
        return this.handleChooseEmit();
      }

      // 复选不限
      if (child.id == -1) {
        if (!child.checked) {
          parent.item.map((i) => {
            i.checked = false;
          })
          child.checked = true;
          parent.id = []
          parent.id.push(child.id);
        } else {
          child.checked = false
          if (parent.id.length == 1) return child.checked = true;
          parent.id.splice(parent.id.indexOf(child.id), 1)
        }
      } else {
        // 普通选项     
        child.checked = !child.checked
        let items = parent.item
        // 选中
        if (child.checked) {
          parent.item.map((i) => {
            if (i.id == -1) {
              if (i.checked) parent.id.splice(parent.id.indexOf(i.id), 1)
              i.checked = false
            }
          })
          parent.id.push(child.id)
        } else {
          // 未选中
          parent.id.splice(parent.id.indexOf(child.id), 1)
          if (!parent.id.length) {
            parent.item.map((i) => {
              if (i.id == -1) {
                i.checked = true
                parent.id.push(i.id)
              }
            })
          }
        }
      }
      this.handleChooseEmit();
    },
    handleChooseEmit() {
      var result = [];
      this.list.forEach((item) => {
        result.push({
          'id': item.id,
          'name': item.name
        })
      })
      this.$emit('handleChoose', result)
    },
    warpClick() {}
  },
  created() {
    this.init();
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/styles/_install";
.condition-warp {
  display: inline-block;
  height: 40px;
  color: #657180;
  position: relative;
  line-height: normal;
  .condition-show {
    display: block;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    padding-right: 30px;
    box-sizing: border-box;
    outline: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #d7dde4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .condition-show-result {}
  }
  .condition-down {
    display: none;
    position: absolute;
    top: 40px;
    left: 0;
    @include transition(500ms);
    @include radius(3px);
    max-height: 480px;
    width: 630px;
    overflow: auto;
    overflow-x: hidden;
    /*margin: 5px 0;*/
    padding: 15px;
    padding-top: 5px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    z-index: 900;
    text-align: left;
    .condition-down-items {
      margin-top: 15px;
      .condition-down-title {
        font-size: 16px;
        color: #8c8c8c;
        margin-left: 4px;
        margin-bottom: 5px;
      }
      .condition-down-content {
        position: relative;
        .open {
          cursor: pointer;
          color: #02b0f0;
          font-size: 14px;
        }
      }
      ul {
        font-size: 0;
        overflow: hidden;
        li {
          font-size: 14px;
          margin-right: 6px;
          margin-bottom: 6px;
          display: inline-block;
          vertical-align: top;
          background-color: #f5f5f5;
          color: #2b3545;
          height: 32px;
          line-height: 32px;
          width: 80px;
          text-align: center;
          @include radius(3px);
          overflow: hidden;
          position: relative;
          label {
            display: block;
            padding: 0 10px;
            cursor: pointer;
            @include transition(500ms);
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.checked {
              color: #fff;
              background-color: #02b0f0;
              &:hover {
                color: #fff;
              }
            }
          }
          .lable {
            &:hover {
              color: #02b0f0;
            }
          }
          .curlable {
            color: #fff;
            background-color: #02b0f0;
          }
          .condition-down-checkbox {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            visibility: hidden;
            &:checked+label {
              color: #fff;
              background-color: #02b0f0;
              &:hover {
                color: #fff;
              }
            }
            &:hover+label {
              color: #02b0f0;
            }
          }
          .cur {
            color: #02b0f0;
          }
        }
      }
    }
  }
  &:hover {
    .condition-down {
      display: inline-block;
    }
    .ivu-select-arrow {
      @include rotate(180deg)
    }
    .condition-show {
      border-color: #35c0f3;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(2, 176, 240, .2);
    }
  }
  ;
}

</style>
