<template>
  <div class="map-warp">
    <div id="map" :style="style"></div>
    <div class="chats">
      <div class="btns">
        <div class="tab">
          <div class="tab-item" v-for="item in navList"> 
            <a :class="item.active? 'active' : ''" @click="handleSelect(item.code)">
              <h2 class="stats-item" id="suspending">{{item.total}}</h2>
              <h5 class="stats-title">{{item.name}}</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--覆盖层 start-->
    <!--报警记录处理总体情况-->
    <div class="alarm-status border-cls" v-show="show_alarmstatus">
      <a>未处理：<span>4</span> 条</a>
      <a>已处理：<span>230</span> 条</a>
      <a>不予处理：<span>4</span> 条</a>
    </div>
    <!--企业图例-->
    <div class="company-status border-cls" v-show="show_companystatus">
      <a style="font-weight:bolder;margin-bottom:5px">图例说明</a>
      <a style="line-height:24px;color:#E74C3C;font-weight:bolder;" class="img1"><span style="color:#fff;font-weight:bolder;margin-left:50px">改造开始</span></a>
      <a style="line-height:24px;color:#89E73C;font-weight:bolder;" class="img2"><span style="color:#fff;font-weight:bolder;margin-left:50px">改造完成</span></a>
      <a style="line-height:24px;color:#E7E33C;font-weight:bolder;" class="img3"><span style="color:#fff;font-weight:bolder;margin-left:50px">投入使用</span></a>
      <a style="line-height:24px;color:#3CDCE7;font-weight:bolder;" class="img4"><span style="color:#fff;font-weight:bolder;margin-left:50px">完成验收</span></a>
    </div>
    <!--雷达图-->
    <div id="alarmradar" v-show="show_alarmradar"></div>
    <!--覆盖层 end-->
  </div>
</template>
<script>
import common from '../../api/common'
export default {
  data() {
    return {
      navList: [
        {
          name: '主机总数',
          code: 'device',
          active: true,
          total: 1888
        },
        {
          name: '报警总数',
          code: 'alarm',
          active: false,
          total: 238
        },
        {
          name: '报警来源分布',
          code: 'alarmradar',
          active: false,
          total: 0
        },
        {
          name: '企业总数',
          code: 'company',
          active: false,
          total: 568
        },
        {
          name: 'Top10企业',
          code: 'companysort',
          active: false,
          total: 0
        }
      ],
      style: {
        width: 'calc(100% - 200px)',
        height: 'calc(100% - 20px)',
        position: 'absolute',
      },
      startPoint: {
        x: 114.423294,
        y: 27.820952
      },
      zoom: 16,
      styleJson: {
        styleJson: [{
            'featureType': 'water',
            'elementType': 'all',
            'stylers': {
              'color': '#031628'
            }
          },
          {
            'featureType': 'land',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000102'
            }
          },
          {
            'featureType': 'highway',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'arterial',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#0b3d51'
            }
          },
          {
            'featureType': 'local',
            'elementType': 'geometry',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'railway',
            'elementType': 'geometry.stroke',
            'stylers': {
              'color': '#08304b'
            }
          },
          {
            'featureType': 'subway',
            'elementType': 'geometry',
            'stylers': {
              'lightness': -70
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry.fill',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': {
              'color': '#857f7f'
            }
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': {
              'color': '#000000'
            }
          },
          {
            'featureType': 'building',
            'elementType': 'geometry',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'green',
            'elementType': 'geometry',
            'stylers': {
              'color': '#062032'
            }
          },
          {
            'featureType': 'boundary',
            'elementType': 'all',
            'stylers': {
              'color': '#465b6c'
            }
          },
          {
            'featureType': 'manmade',
            'elementType': 'all',
            'stylers': {
              'color': '#022338'
            }
          },
          {
            'featureType': 'label',
            'elementType': 'all',
            'stylers': {
              'visibility': 'off'
            }
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
              "color": "#022338",
              "visibility": "off"
            }
          }

        ]
      },
      gmap: null,
      icon1: require('../../assets/1.png'),
      icon2: require('../../assets/2.png'),
      icon3: require('../../assets/3.png'),
      icon4: require('../../assets/4.png'),
      icon5: require('../../assets/5.jpg'),
      show_alarmstatus: false,
      show_companystatus: false,
      show_alarmradar: true,
    }
  },
  mounted() {
    // 百度地图API功能
    var map = this.gmap = new BMap.Map("map"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(this.startPoint.x, this.startPoint.y), this.zoom); // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("宜春市"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.setMapStyle(this.styleJson) //地图样式
    var opts = {offset: new BMap.Size(10, 70), anchor: BMAP_ANCHOR_TOP_LEFT}
    map.addControl(new BMap.NavigationControl(opts));
    this.initAlarmRadar();
    this.show_alarmradar = false;
  },
  methods: {
    handleSelect(code) {
      this.resetActive()
      this.resetComponents()
      switch(code){
        case 'device': this.activeItem(code); break;
        case 'alarm': this.activeItem(code); this.show_alarmstatus = true; break;
        case 'alarmradar': 
          this.activeItem(code); 
          this.show_alarmradar = true;
          this.initAlarmRadar();
          break;
        case 'company': 
          this.activeItem(code); 
          this.show_companystatus = true; 
          this.getCompanys();
          break;
        case 'companysort': this.activeItem(code); break;
        default: this.activeItem('device'); break;
      }
    },
    activeItem(code) {
      this.navList.map(function(item) {
        if(code === item.code){
          item.active = true
        }
      });
    },
    resetActive() {
      this.navList.map(function(item){
        item.active = false
      })
    },
    resetComponents() {
      this.show_alarmstatus = false
      this.show_companystatus = false
      this.show_alarmradar = false
    },
    // 显示所有主机
    // 显示所有企业
    getCompanys() {
      var that = this;
      var points = [
        { 'lng': 114.433894, 'lat': 27.831334, 'type': 1 },
        { 'lng': 114.433894, 'lat': 27.831334, 'type': 2 },
        { 'lng': 114.338458, 'lat': 27.772028, 'type': 3 },
        { 'lng': 114.090669, 'lat': 28.111318, 'type': 4 },
        { 'lng': 114.314024, 'lat': 27.69401, 'type': 1 },
        { 'lng': 114.403711, 'lat': 27.919722, 'type': 4 },
        { 'lng': 114.449417, 'lat': 28.110808, 'type': 4 },
        { 'lng': 114.175757, 'lat': 28.054207, 'type': 2 }
      ];
      addMarker(points);

      function addMarker(points) {
        //循环建立标注点
        for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
          var myIcon = "";
          if (points[i].type == 1) {
            myIcon = new BMap.Icon(that.icon1, new BMap.Size(40, 45));
          }
          if (points[i].type == 2) {
            myIcon = new BMap.Icon(that.icon2, new BMap.Size(40, 45));
          }
          if (points[i].type == 3) {
            myIcon = new BMap.Icon(that.icon3, new BMap.Size(40, 45));
          }
          if (points[i].type == 4) {
            myIcon = new BMap.Icon(that.icon4, new BMap.Size(40, 45));
          }
          var marker = new BMap.Marker(point, { icon: myIcon }); //将点转化成标注点
          that.gmap.addOverlay(marker); //将标注点添加到地图上
          //添加监听事件
          (function() {
            var thePoint = points[i];
            marker.addEventListener("onmouseover",
              function() {
                showInfo(this, thePoint);
              });
          })();
        }
      };

      function showInfo(thisMarker, point) {
        //获取点的信息
        var sContent = '<div style="width:691px;height:400px;font-size:12px;">' +
          '<div  style="width:691px;height:266px;display:flex;">' +
          '<div style="width:500px;height:266px;display:flex;">' +
          '<div style="height:400px;width:158px;padding-top:7px">' +
          '<h5 style="font-weight:bolder;color:#006400;margin-bottom:18px;font-size:17px;">工程基本信息</h5>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程名称</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑名称</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程地址</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑结构体系</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">开工日期</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">总投资</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造后年节能/吨标煤</a>' +
          '</div>' +
          '<div style="height:400px;width:158px;padding-top:42px">' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '能源改造' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '创新大楼' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '宜山路1008号' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '商业' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-8-22' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '155' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '60' + '</a>' +
          '</div>' +
          '<div style="height:400px;width:158px;padding-top:42px">' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑功能</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑总面积(㎡)</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">占地面积(㎡)</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">竣工日期</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">投入使用日期</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">是否采用合同能源</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造节能率%</a>' +
          '</div>' +
          '<div style="height:400px;width:158px;padding-top:42px">' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '商业' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '244' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '244' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-9-22' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-9-22' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '是' + '</a>' +
          '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '10%' + '</a>' +
          '</div>' +
          '</div>'

          +
          '<div style="width:230px;height:224px;margin-top:42px;">' +
          '<img src="' + that.icon5 + '" style="width:100%;height:100%">' +
          '</div>'

          +
          '</div>'

          +
          '</div>'

        var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
        thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow

      }
    },
    // 主机/企业定位
    // 热点/图标点击事件
    // 显示报警柱状图
    // 显示报警来源分布图
    initAlarmRadar() {
      var worldMapContainer = common.getById(alarmradar);
      worldMapContainer.style.top = '60px';
      worldMapContainer.style.height = ((window.innerHeight) - 150) + 'px';;
      var myChart = echarts.init(worldMapContainer);

      var lineStyle = {
        normal: {
          width: 1.5,
          opacity: 0.5
        }
      };
      var option = {
        tooltip: {},
        legend: {
          data: ['袁州区'],
          bottom: 5,
          textStyle: {
            color: '#fff',
            fontSize: 18
          },
        },
        radar: {
          shape: 'circle',
          indicator: [
            { name: '门磁', max: 50 },
            { name: '玻璃破碎检测.5', max: 60 },
            { name: '煤气检测', max: 70 },
            { name: '烟雾检测', max: 30 },
            { name: 'SOS 按键', max: 50 },
            { name: '震动检测', max: 50 },
            { name: '漏水检测', max: 70 },
            { name: '红外探测', max: 80 },
            { name: '红外对射', max: 40 }
          ],
          splitNumber: 5,
          name: {
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)',
                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)', 'rgba(238, 197, 102, 0.2)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [{
          name: '袁州区',
          type: 'radar',
          lineStyle: lineStyle,
          areaStyle: {
            normal: {
              opacity: 0.1
            }
          },
          data: [{
            value: [23, 34, 44, 5, 34, 23, 23, 23, 23],
            name: '袁州区',
            lineStyle: lineStyle,
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#fff'
              }
            },
          }]
        }]
      };
      myChart.setOption(option);
      //窗口或框架被调整大小时发生。
      window.onresize = function() {
        //重置容器高宽
        myChart.resize();
      };
    }
    // 显示企业排名
  }
}

</script>
<style scoped>
.content-container {
  padding: 0 !important;
}
.chats {
  position: absolute;
  z-index: 99;
  width: calc(100% - 200px);
  height: calc(100% - 20px);
  overflow: auto;
  background: rgba(7, 17, 27, 0.5);
  height: 62px;
}

.map {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(255, 255, 255, 0.8);
  color: white
}

.btns {
  height: 62px;
  background: rgba(255, 255, 255, 0.1);
}

.tab {
  display: flex;
  width: 100%;
  line-height: 62px;
}

.tab-item {
  flex: 1;
  text-align: center;
}

.tab-item a {
  display: block;
  font-size: 16px;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.active {
  background: #4fc08d;
  color: #fff;
}
.stats-item {
  height: 40px;
  line-height: 1.1;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 1px;
  color: inherit;
  font-size: 35px;
  font-family: inherit;
}
.stats-title {
  height: 19px;
  line-height: 1.1;
  margin-top: 3px;
  margin-bottom: 0;
  font-weight: 500;
  color: inherit;
  font-size: 14px;
  font-family: inherit;
}

/*处理报警合计*/
.alarm-status {
  width: 200px;
  height: 150px;
  position: absolute;
  top: 100px;
  right: 50px;
  display: flex;
  padding-left: 40px;
}
.alarm-status a {    
  height: 36px;
  line-height: 36px;
  font-size: 18px;
  color: #fff;
  font-weight: bolder;
}
.alarm-status a span {
  color: #fffc11;
  font-size: 24px;
}

.border-cls {
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background: rgba(0, 0, 0, .5);
  box-shadow: 4px 5px 10px rgba(159, 158, 156, .6);
}

.company-status {
  width: 200px;
  height: 200px;
  position: absolute;
  display: flex;
  padding-left: 40px;
  bottom: 50px;
  right: 50px;
}

.company-status a {
  height: 36px;
  line-height: 36px;
  font-size: 18px;
  color: #fff
}

.img1 {
  background: url(../../assets/1.png) no-repeat;
  background-size: 32px 30px
}

.img2 {
  background: url(../../assets/2.png) no-repeat;
  background-size: 32px 30px
}

.img3 {
  background: url(../../assets/3.png) no-repeat;
  background-size: 32px 30px
}

.img4 {
  background: url(../../assets/4.png) no-repeat;
  background-size: 32px 30px
}
</style>
