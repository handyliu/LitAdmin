<template>
  <div class="app-container company-container">
    
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" sortable label="日期" width="150" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]" :filter-method="filterHandler">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>          
          <!--工具条-->
          <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                           style="float:right;">
            </el-pagination>
          </el-col>
          <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <transition name="el-fade-in-linear">
            <div v-show="show" class="transition-box">地图位置</div>
          </transition>
          <transition name="el-fade-in">
            <div v-show="show" class="transition-box">
              <my-camera></my-camera>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import MyCamera from '@/components/VideoPlayer'

export default {
  name: 'camera',
  components: { MyCamera },
  data() {
    return {
      currentPage: 4,
      tableData: [{
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
      }]
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleClick(row) {
      console.log(row);
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
    },
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
</style>
