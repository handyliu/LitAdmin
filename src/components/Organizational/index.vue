<template>  
  <div class="condition-warp">
    <div class="condition-show">
      <span>区域：</span>
      <span class="condition-show-result">{{getFilterName()}}</span>
      <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow"></i>
    </div>
    <div class="condition-down">
      <div class="condition-down-items" @click.stop="warpClick">
        <div class="condition-down-title">市</div>
        <div  class="condition-down-content">
          <ul>
            <li>
              <input type="radio" v-model="regionId" class="condition-down-checkbox" value="-1" id="regionId">
              <label for="regionId" @click.stop="handleChooseRegion()" >不限</label>
            </li>
            <li v-for = "(item,index) in regionList" :key = "index" v-if="index<numObj.regionNum">
              <input type="radio" v-model="regionId" class="condition-down-checkbox" :value="item.id" :id="'region'+item.id" >
              <label :for="'region'+item.id" @click.stop="handleChooseRegion()" :title="item.name">{{item.name}}</label>
            </li>
            <li v-if="regionList.length>13">
              <div class="open" @click="handleOpen(regionList,numObj.regionNum,'regionNum')">
                <span v-if="numObj.regionNum==12">展开</span>
                <span v-if="numObj.regionNum>12">收起</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="condition-down-title">县（区）</div>
        <div  class="condition-down-content">
          <ul v-if="!multiple">
            <li>
              <input type="radio" v-model="companyId" class="condition-down-checkbox" value="-1" id="companyId">
              <label for="companyId" @click.stop="handleChooseCompany()" >不限</label>
            </li>
            <li v-for = "(item,index) in companyList" :key = "index" v-if="index<numObj.companyNum">
              <input type="radio" v-model="companyId" class="condition-down-checkbox" :value="item.id" :id="'company'+item.id" >
              <label :for="'company'+item.id" @click.stop="handleChooseCompany()" :title="item.name">{{item.name}}</label>
            </li>
            <li v-if="companyList.length>13">
              <div class="open" @click="handleOpen(companyList,numObj.companyNum,'companyNum')">
                <span v-if="numObj.companyNum==12">展开</span>
                <span v-if="numObj.companyNum>12">收起</span>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li>
              <input type="checkbox" v-model="companyIds" class="condition-down-checkbox" value="-1" id="companyId">
              <label for="companyId" @click.stop="handleChooseCompanyNo()" >不限</label>
            </li>
            <li v-for = "(item,index) in companyList" :key = "index" v-if="index<numObj.companyNum">
              <input type="checkbox" v-model="companyIds" class="condition-down-checkbox" :value="item.id" :id="'company'+item.id" >
              <label :for="'company'+item.id" @click.stop="handleChooseCompany()" :title="item.name">{{item.name}}</label>
            </li>
            <li v-if="companyList.length>13">
              <div class="open" @click="handleOpen(companyList,numObj.companyNum,'companyNum')">
                <span v-if="numObj.companyNum==12">展开</span>
                <span v-if="numObj.companyNum>12">收起</span>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="condition-down-title" v-if="!multiple">所属处</div>
        <div  class="condition-down-content" v-if="!multiple">
          <ul>
            <li>
              <input type="radio" v-model="branchId" class="condition-down-checkbox" value="-1" id="branchId">
              <label for="branchId" @click.stop="handleChooseBranch()" >不限</label>
            </li>
            <li v-for = "(item,index) in branchList" :key = "index" v-if="index<numObj.branchNum">
              <input type="radio" v-model="branchId" class="condition-down-checkbox" :value="item.id" :id="'branch'+item.id" >
              <label :for="'branch'+item.id" @click.stop="handleChooseBranch()" :title="item.name">{{item.name}}</label>
            </li>
            <li v-if="branchList.length>13">
              <div class="open" @click="handleOpen(branchList,numObj.branchNum,'branchNum')">
                <span v-if="numObj.branchNum==12">展开</span>
                <span v-if="numObj.branchNum>12">收起</span>
              </div>
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
  name: 'ConditionOrg',
  data () {
    return {
      regionId: '',
      companyId: '',
      companyIds: [-1],
      branchId: '',
      regionList:[],
      companyList:[],
      branchList:[],
      numObj:{
        regionNum: 12,
        companyNum: 12,
        branchNum: 12,
      }
    }
  },
  props: {
    multiple:{
      type: Boolean,
      default: false
    },
  },
  methods:{
    init(query){
      this.resetInit();
      if(query){
        this.getRegionList(()=>{
          this.regionId = query.regionId;
        });
        if(query.regionId != -1){
          this.getCompanyList(query.regionId,()=>{
            this.companyId = query.companyId;
          });
        }
        if(query.companyId != -1 && !this.multiple){
          this.getBranchList(query.companyId,()=>{
            this.branchId = query.branchId;
          });
        }
      }else{
        this.getRegionList();
      }
    },
    resetInit(){
      this.companyIds = [-1];
      this.regionId = "-1";
      this.companyId = "-1";
      this.branchId = "-1";
      this.regionList = [];
      this.companyList = [];
      this.branchList = [];
    },
    // 获取项目列表
    getRegionList(callback) {
      this.resetInit();

      // this.regionList = [{"F_Id" : 1, "F_FullName" : "宜春市", "F_ParentId" : "0"}];
      this.regionList = [{"id" : 1, "name" : "宜春市", "parentid" : "0"}];
      if(callback) callback();
    },
    // 获取子公司列表
    getCompanyList(orgId,callback) {

      this.companyList = [
        {"id" : 2, "name" : "万载县", "parentid" : "1"},
        {"id" : 3, "name" : "上高县", "parentid" : "1"}
      ];
      if(callback) callback();
    },
    // 获取所属处列表
    getBranchList(orgId,callback) {
      this.branchList = [
        {"id" : 4, "name" : "株潭镇", "parentid" : "2"},
        {"id" : 5, "name" : "黄矛镇", "parentid" : "2"}
      ];
      if(callback) callback();
    },
    // 更多和收起
    handleOpen(list,num,key){
      if(num == 12){
        this.numObj[key] = list.length;
      }else{
        this.numObj[key] = 12;
      }
    },
    handleChooseRegion() {
      this.companyId = "-1";
      this.companyIds = [-1];
      this.branchId = "-1";
      this.companyList = [];
      this.branchList = [];
      setTimeout(()=>{
        this.emitHandleChooseBranch();     
        this.getCompanyList(this.regionId);
      }, 30);
    },
    handleChooseCompany(){
      this.branchId = "-1";
      this.branchList = [];
      setTimeout(()=>{
        if(this.multiple){
          if(this.companyIds.indexOf(-1)>-1){
            this.companyIds.splice(this.companyIds.indexOf(-1),1);
          }
        }else{
          this.getBranchList(this.companyId);
        }
        this.emitHandleChooseBranch();
      }, 30);
    },
    handleChooseCompanyNo(){
      setTimeout(()=>{
        this.companyIds = [-1];
        this.emitHandleChooseBranch();
      }, 30);
    },
    handleChooseBranch(){
      setTimeout(()=>{
        this.emitHandleChooseBranch();
      }, 30);
    },
    emitHandleChooseBranch(){
      var parms = {
        "regionId": this.regionId,
        "companyId": this.multiple ? this.companyIds : this.companyId,
        "branchId": this.branchId,
      }
      if(this.multiple){
        if(parms.companyId.indexOf(-1)>-1){ parms.companyId=[] }
      }
      this.$emit('handleChooseOrgan',parms);
    },
    getFilterName(){
      var haveName = false;
      var result = '';
      if(this.regionList && this.regionList.length>0 && this.regionId != '-1'){
       result = util.getName(this.regionList,'id',this.regionId,'name');
        haveName = true;
      }
      if(this.multiple){
        if(this.companyList && this.companyList.length>0 && this.companyIds.indexOf(-1)<0){
          result = result+'-'+util.getName(this.companyList,'id',this.companyIds[0],'name');
          if(this.companyIds.length >1) result = result+'...';
          haveName = true;
        }
      }else{
        if(this.companyList && this.companyList.length>0 && this.companyId != '-1'){
          result = result+'-'+util.getName(this.companyList,'id',this.companyId,'name');
          haveName = true;
        }
      }
      if(!haveName){
        result = '不限'
      }
      return result;
    },
    warpClick() {}
  },
  created() {
    this.init();
  },
  activated() {
    // this.init();
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/styles/_install";

.condition-warp {
  display: inline-block;
  width: 180px;
  height: 40px;
  color: #657180;
  position: relative;
  line-height: normal;

  .condition-show{
    display: block;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    padding-right: 15px;
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
    text-overflow:ellipsis;
    .condition-show-result{

    }
  }
  .condition-down{
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
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    z-index: 900;
    text-align: left;
    .condition-down-items {
      .condition-down-title {
        font-size: 16px;
        color: #8c8c8c;
        margin-left: 4px;
        margin-bottom: 5px;
        margin-top: 10px;
      }
      .condition-down-content{
        position: relative;
        .open{
          cursor: pointer;
          color: #02b0f0;
          font-size: 14px;
        }
      }
      ul {
        font-size: 0;
        width: 625px;
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
          }
          .lable{
            &:hover{
              color: #02b0f0;
            }
          }
          .curlable{
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
  &:hover{
    .condition-down{
      display: inline-block;
    }
    .ivu-select-arrow{
      @include rotate(180deg)
    }
    .condition-show{
      border-color: #35c0f3;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(2,176,240,.2);
    }
  }
}
</style>
