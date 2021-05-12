<template>
  <el-container class="home-container">
    <!-- header-->
    <el-header>
      <div>
        <img
          style="width: 50px; height: 50px"
          src="../assets/logo1.jpg"
          alt=""
        />
        <span>Liovee社区后台管理系统</span>
      </div>
      <el-button type="info" @click="logout"> 退出</el-button>
    </el-header>
    <el-container>
      <!-- aside-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域 -->
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <!--一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!--一级菜单的模板 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单 -->
            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: [
        {
          authName: '用户管理',
          children: [
            {
              authName: '个人信息',
              children: [],
              id: 150,
              order: null,
              path: 'ours'
            },
            {
              authName: "用户列表",
              children: [],
              id: 110,
              order: null,
              path: 'users',
            }
          ],
          id: 125,
          order: 1,
          path: 'users',
        },
        
        {
          authName: "信息发布",
          children: [
            {
              authName: "社区信息",
              children: [],
              id: 111,
              order: null,
              path: "community",
            },
            {
              authName: "企业招聘",
              children: [],
              id: 112,
              order: null,
              path: "company",
            },
            {
              authName: "出租房屋",
              children: [],
              id: 113,
              order: null,
              path: "renthouse",
            }
          ],
          id: 103,
          order: 2,
          path: "rights",
        },
        {
          authName: "请求对接",
          children: [
            {
              authName: "对接查看",
              children: [],
              id: 114,
              order: null,
              path: "demand",
            }
          ],
          id: 101,
          order: 2,
          path: "rights",
        },
        {
          authName: "请求分析",
          children: [
            {
              authName: "对接分析",
              children: [],
              id: 115,
              order: null,
              path: "anynis",
            }
          ],
          id: 102,
          order: 2,
          path: "rights",
        },
        {
          authName: "意见反馈",
          children: [
            {
              authName: "反馈分析",
              children: [],
              id: 116,
              order: null,
              path: "retroaction",
            }
          ],
          id: 145,
          order: 2,
          path: "rights",
        },
      ],
      iconsObj: {
        125: "iconfont icon-icon_black-20",
        103: "iconfont icon-icon_black-27",
        101: "iconfont icon-icon_black-15",
        102: "iconfont icon-icon_black-32",
        145: "iconfont icon-icon_black-11",
      },
      isCollapse: false,
      activePath: "",
    };
  },
  created() {
    //this.getMenuList();
    //this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout: function () {
      //window.sessionStorage.clear();
      this.$router.push("/login");
    },

    // async getMenuList() {
    //   const { data: res } = await this.$http.get("menus");
    //   console.log(res);
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
    //   this.menulist = res.data;
    // },
    // 点击按钮切换按钮折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header > div {
  display: flex;
  align-items: center;
}
.el-header > div span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 15px;
}
.toggle-button {
  text-align: center;
  background-color: #4a5056;
  font-size: 10px;
  line-height: 20px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
