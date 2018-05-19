<template>
  <div class="app-container">
    <!--顶部操作区域 批量推送消息-->
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container layout-box">
          <el-table :data="tableData4" :style="tbstyle" id="tbCompany" border>
            <el-table-column fixed type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.province }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.date }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.city }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.zip }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="150" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container layout-box">地图位置（位置/简介/接警次数）</div>
          </template>
          <template slot="paneR">
            <div class="bottom-container layout-box">企业基本信息/设备实况列表（详情）/摄像头实况列表（详情）</div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>
<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'company',
  components: { splitPane },
  data() {
    return {
      tbstyle: {
        width: '100%',
        height: '100%'
      },
      tableData4: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted() {
    var table = document.getElementById('tbCompany')
    //table.style.width = window.innerWidth + 'px';
    table.style.height = ((window.innerHeight) * 0.9) + 'px'
  },
  computed: {},
  created() {},
  methods: {
    resize() {
      console.log('resize')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    }
  }
}

</script>
<style scoped>
.left-container {
  height: 100%;
}

.top-container {
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  height: 100%;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
