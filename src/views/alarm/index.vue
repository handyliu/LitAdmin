<template>
  <div id="alarm-container" :style="mainstyle">
    <!-- 顶部条件与工具栏START -->
    <tool-bar>
      <template slot="left">
        <el-form :inline="true" :model="filters" class="reset-form">
          <!-- <el-form-item>
            <el-select
              v-model="selValue"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择" automatic-dropdown>
              <el-option
                v-for="item in selOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="datevalue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item class="filter-panel">
            <condition-org
              ref="ref_conditionOrg"
              multiple
              @handleChooseOrgan="handleChooseOrgan">
            </condition-org>
          </el-form-item>
          <!-- 筛选 -->
          <el-form-item class="filter-panel">
            <condition-other 
              ref="ref_conditionfilter"
              width="400px"
              :list = 'filterList'
              @handleChoose = 'handleChooseFilter'>
            </condition-other>
          </el-form-item>
          <!-- 筛选时间 -->
          <!-- <el-form-item>
            <el-date-picker
              v-model="datepickerValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="handlerPickerChange">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item>
            <el-input v-model="filters.name" placeholder="关键字" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="right">
        <!-- <el-select class="filter-single" v-model="selListType" placeholder="显示模式">
          <el-option
            v-for="item in listTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <span 
          class="classType" 
          :class="classType?'active':''"
          @click="handleChangeClassType(1)">
          <i class="type_icon type_icon2"></i>
        </span>
        <span 
          class="classType" 
          :class="classType?'':'active'"
          @click="handleChangeClassType(0)">
          <i class="type_icon type_icon1"></i>
        </span>
      </template>
    </tool-bar>
    <!-- 顶部条件与工具栏END -->
    <el-row>
      <el-col :span="14">
        <!-- 表格START -->
        <div class="grid-content" :style="gridstyle">
          <div class="grid-table" :style="tableBottom">
            <div class="grid-table-container" id="grid-table-container">
              <el-table :data="datalist" border :height="tableHeight" highlight-current-row>
                <el-table-column fixed type="expand" label="" width="30">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="[图书简介]">
                        <span>{{ rowData.description }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column fixed prop="name" label="书名" sortable></el-table-column>
                <el-table-column prop="author" label="作者" width="100" sortable></el-table-column>
                <el-table-column prop="publishAt" label="出版日期" width="150" sortable :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">监控</el-button>
                    <el-button size="small" type="text" @click="showEditDialog(scope.$index,scope.row)">报警</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 分页START -->
          <div class="grid-tfoot" v-if="isPager">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :pager-count="5" :page-sizes="[10, 20, 30, 50]" :page-size="10" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
          </div>
          <!-- 分页END -->
        </div>
        <!-- 表格END -->
      </el-col>
      <el-col :span="10" style="padding-right: 20px">
        <div class="grid-content">
          <transition name="el-fade-in-linear">
            <block-box title="地图定位" :styles="mapstyle">
              <template slot="body">
                <el-amap
                  vid="amapDemo"
                  :center="center"
                  :zoom="zoom"
                  class="amap-demo"
                  :events="events">
                  <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :content="marker.content" :events="marker.events"></el-amap-marker>
                </el-amap>
              </template>
            </block-box>
          </transition>
          <transition name="el-fade-in">
            <block-box title="详情" :styles="infostyle">
              <template slot="tool">                
                <div class="tab">
                  <ul>
                    <li 
                      v-for="item in tabList" 
                      :class="item.active?'active':''"
                      @click="handleTabChange(item.id)">
                      {{item.name}}
                    </li>
                  </ul>
                </div>
              </template>
              <template slot="body">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ rowData.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ rowData.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ rowData.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ rowData.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ rowData.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ rowData.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ rowData.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </block-box>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import util from '../../common/util'
import API from '../../api/api_book';
import ToolBar from '../../components/ToolBar'
import BlockBox from '../../components/BlockBox'
import ConditionOrg from '../../components/Organizational'
import ConditionOther from '../../components/FilterOther'
import Bus from '@/bus'

export default {
  name: 'alarm',
  components: { ToolBar, BlockBox, ConditionOrg, ConditionOther },
  props: {
    isPager: { //是否分页
      type: Boolean,
      default: true
    }
  },
  data() {
    let self = this
    return {
      classType: 0, // 列表类型
      selListType: '1',
      mainstyle: {
        height: '100%'
      },
      gridstyle: {},
      mapstyle: 'height: 200px',
      infostyle: 'height: 100px',
      filters: {
        name: ''
      },
      datalist: [],
      total: 0,
      page: 1,
      limit: 10,
      loading: false,
      sels: [], //列表选中列
      currentPage: 1,
      zoom: 12, // 地图
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
      },
      rowData: {
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },
      tabList: [
        {id: '1', name: '传感器', active: true},
        {id: '2', name: '预警记录', active: false}
      ],
      selOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selValue: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      datevalue: '',
      filterList:[
        {
          'title':'状态',
          'id': [-1],
          'name': 'status',
          'multiple':true,
          'item':[
            {'id':-1,'name':'不限'},
            {'id':0,'name':'案前'},
            {'id':1,'name':'案中'},
            {'id':2,'name':'撤场'},
            {'id':3,'name':'结案'},
            {'id':5,'name':'尾盘'},
            {'id':6,'name':'停售'}
          ]
        }
      ],      
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      datepickerValue: '',
      listTypeOptions: [{
        value: '1',
        label: '列表模式'
      }, {
        value: '2',
        label: '四分屏'
      }, {
        value: '3',
        label: '十六分屏'
      }]
    }
  },
  computed: {
    tableHeight: function() {
      return ((window.innerHeight) - 210)
    },
    tableBottom: function() {
      if (this.isPager) {
        return 'bottom:52px';
      } else {
        return 'bottom:0';
      }
    }
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
    init() {
      // 初始化
      // this.handleChangeClassType(0);
    },
    // 切换列表风格
    handleChangeClassType(type) {
      var that = this;
      that.classType = type;
    },
    handleClick(row) {
      console.log(row);
      this.routeGo(row.id, '/company/detail')
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.search();
    },
    resize() {
      console.log('resize')
    },
    handleSearch() {
      this.total = 0;
      this.page = 1;
      this.search();
    },
    search() {
      let that = this;
      let params = {
        page: that.page,
        limit: 10,
        name: that.filters.name
      };

      that.loading = true;
      API.findList(params).then(function(result) {
        that.loading = false;
        if (result && result.books) {
          that.total = result.total;
          that.datalist = result.books;
        }
      }, function(err) {
        that.loading = false;
        that.$message.error({ showClose: true, message: err.toString(), duration: 2000 });
      }).catch(function(error) {
        that.loading = false;
        console.log(error);
        that.$message.error({ showClose: true, message: '请求出现异常', duration: 2000 });
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //删除
    delBook: function (index, row) {
      let that = this;
      this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
        that.loading = true;
        API.remove(row.id).then(function (result) {
          that.loading = false;
          if (result && parseInt(result.errcode) === 0) {
            that.$message.success({showClose: true, message: '删除成功', duration: 1500});
            that.search();
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      }).catch(() => {
      });
    },
    //显示编辑界面
    showEditDialog: function (index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //批量删除
    batchDeleteBook: function () {
      let ids = this.sels.map(item => item.id).toString();
      let that = this;
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        that.loading = true;
        API.removeBatch(ids).then(function (result) {
          that.loading = false;
          if (result && parseInt(result.errcode) === 0) {
            that.$message.success({showClose: true, message: '删除成功', duration: 1500});
            that.search();
          }
        }, function (err) {
          that.loading = false;
          that.$message.error({showClose: true, message: err.toString(), duration: 2000});
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      }).catch(() => {

      });
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
    },
    handleTabChange(id) {
      var that = this;
      for(var i =0,len=that.tabList.length;i<len;i++){
        if(that.tabList[i].id == id){
          that.tabList[i].active = true;
          //that.curtab = that.tabList[i].name;
          //that.getData(that.caseId, that.curYear)
        }else{
          that.tabList[i].active = false;
        }
      }
    },
    // 区域组件callBack
    handleChooseOrgan(organObj) {
      if(organObj.regionId == '-1'){ 
        this.filters.orgId = '';
        return;
      }
      if(organObj.companyId.length>0){
        this.filters.orgId = organObj.companyId.join(',');
      }else{
        this.filters.orgId = organObj.regionId;
      }
    },
    handleChooseFilter(result){
      result.map((o)=>{
        if(o.id.indexOf(-1)>-1){
          this.filters[o.name] = '';
        }else{
          this.filters[o.name] = o.id.join(',');
        }
      })
    },
    handlerPickerChange(param) {
      console.log(param);
    },
    // 路由跳转
    routeGo(id, path) {
      this.$router.push({
        path: path,
        query: {
          "id": id
        }
      });
    }
  },
  mounted() {
    this.mainstyle.height = ((window.innerHeight) - 70) + 'px';
    this.gridstyle.height = ((window.innerHeight) - 158) + 'px';
    // this.tableStyle.height = ((window.innerHeight) - 210) + 'px';
    this.mapstyle = 'height: ' + ((window.innerHeight) - 400) + 'px'
    this.infostyle = 'height: ' + ((window.innerHeight) - 516) + 'px'
    this.handleSearch()
  }
}

</script>
<style scoped>
.el-form-item {
  margin-top: 5px;
}

.filter-panel{
  display: inline-block;
  vertical-align: top;
}

</style>
