<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn" v-show="collapsed">
        <a href="/">LOGO</a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/">LOGO</a>
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">接警中心（可视化版）</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="topbar-toggle">
          <a class="toggle-link"  @click="asideToggle">&#9776;</a>
        </div>
      </div>
    </el-col>
    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow" :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>
      <!--右侧内容区-->
      <section class="content-container">
        <div class="bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
        <AppAside/>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { bus } from '../bus.js'
import API from '../api/api_user';
import AppAside from '../components/Aside'

export default {
  name: 'home',
  components: {
    AppAside
  },
  created() {
    bus.$on('setNickName', (text) => {
      this.nickname = text;
    })

    bus.$on('goto', (url) => {
      if (url === "/login") {
        localStorage.removeItem('access-user');
      }
      this.$router.push(url);
    })
  },
  data() {
    return {
      defaultActiveIndex: "0",
      nickname: '',
      collapsed: false,
    }
  },
  methods: {
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout() {
      let that = this;
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonClass: 'el-button--warning'
      }).then(() => {
        //确认
        that.loading = true;
        API.logout().then(function(result) {
          that.loading = false;
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
        }, function(err) {
          that.loading = false;
          that.$message.error({ showClose: true, message: err.toString(), duration: 2000 });
        }).catch(function(error) {
          that.loading = false;
          console.log(error);
          that.$message.error({ showClose: true, message: '请求出现异常', duration: 2000 });
        });
      }).catch(() => {});
    },
    // 展示报警栏
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  },
  mounted() {
    let user = localStorage.getItem('access-user');
    if (user) {
      user = JSON.parse(user);
      this.nickname = user.nickname || '';
    }
    document.body.classList.toggle('aside-menu-hidden')
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;

    .topbar-btn {
      color: #fff;
    }
    /*.topbar-btn:hover {*/
    /*background-color: #4A5064;*/
    /*}*/
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logos {
      float: left;
      width: 180px;
      line-height: 26px;
    }
    .topbar-logo img,
    .topbar-logos img {
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }
    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
    }
    .topbar-account {
      float: right;
      padding-right: 12px;
    }
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      padding-left: 10px;
    }
  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    min-width: 50px;
    background: #333744;
    &::-webkit-scrollbar {
      display: none;
    }

    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu {
      height: 100%;
      /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #333744;
      border-right: 0px;
    }

    .el-submenu .el-menu-item {
      min-width: 60px;
    }
    .el-menu {
      width: 180px;
    }
    .el-menu--collapse {
      width: 60px;
    }

    .el-menu .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }

    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #7ed2df;
    }
  }

  .menu-toggle {
    background: #4A5064;
    text-align: center;
    color: white;
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: rgba(7, 17, 27, 0.5);
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;

    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
  .topbar-toggle {
    float: right;
    width: 50px;
    margin: 0!important;
    text-align: center;
    height: 50px;
    line-height: 50px;
    .toggle-link {
      padding-top: 0;
      padding-bottom: 0;
      border: 0;
      background: 0;
      padding-right: 0;
      padding-left: 0;
      cursor: pointer;
      display: inline-block;
      font-size: 1.25rem;
      line-height: 1;
      color: #2d8cf0;
      text-decoration: none;
      outline: 0;
      transition: color .2s ease;
      &:hover{color:#57a3f3}
      &:active{color:#2b85e4}
      &:active,&:hover{outline:0;text-decoration:none}
    }
  }
}

</style>
