<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="50">
        <el-col :span="8"
          ><!-- 搜索与添加区域 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button @click="addDialogVisible = true" type="primary"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="姓名" prop="userName"> </el-table-column>
        <el-table-column label="家庭住址" prop="homeAddress"> </el-table-column>
        <el-table-column label="电话" prop="phoneNum"> </el-table-column>
        <el-table-column label="余额" prop="remain"> </el-table-column>
        <el-table-column label="角色" prop="rights"> </el-table-column>
        <!-- <el-table-column label="状态">
          <template slot-scope="scope"> -->
        <!-- {{ scope.row }}
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleModified(scope.$index)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="addForm.homeAddress"></el-input>
        </el-form-item>
        <!-- 底部区域 -->
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toIncrease">确 定</el-button>
        </span>
      </el-form>
    </el-dialog>

    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <!-- 内容主体 -->
      <el-form :model="editUserForm" ref="editUserFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="userListOne.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userListOne.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userListOne.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="userListOne.rights"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userListOne: {},
      editDialogVisible: false,
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pageNum: 1,
        //当前每页显示多少条数据
        pageSize: 5,
      },
      userList: [],
      index: 0,
      total: 0,
      //控制对话框的显示与隐藏
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        userName: "",
        password: "",
        phoneNum: "",
        homeAddress: "",
        rights: 0,
      },
      editUserForm: {},
      //添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: "用户名在8~12个字符之间",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async toIncrease() {
      this.addDialogVisible = false;
      var userEntity = this.addForm;
      const res = await axios.post("/user/insertUser", userEntity);
      console.log(res);
      this.addForm = {
        userName: "",
        password: "",
        phoneNum: "",
        homeAddress: "",
        rights: 0,
        remain: 0,
      };
      this.getUserList();
    },
    handleModified(index) {
      this.index = index;
      this.editDialogVisible = true;
      this.userListOne = this.userList[index];
      //console.log(this.userList[index])
    },
    async handleDelete(index) {
      const userId = this.userList[index].userId;
      const re = {
        userId: userId,
      };
      const res = await axios({
        url: "/user/deleteUser",
        method: "GET",
        params: re,
      });
      this.getUserList();
      if (res.data.data == "删除成功") {
        this.$message.success("删除成功");
      } else {
        this.$message.success("删除失败");
      }
    },
    async editUser() {
      this.editDialogVisible = false;
      const userEntity = this.userListOne;
      // userEntity.userId = this.userList
      const res = await axios.post("/user/updateUser",userEntity);
      this.getUserList();
      console.log(userEntity);
    },
    async getUserList() {
      var pageNum = this.queryInfo.pageNum;
      var pageSize = this.queryInfo.pageSize;
      const res = await axios({
        method: "get",
        url: "/user/selectAllUser",
        params: { pageNum, pageSize },
      });
      this.userList = res.data.data.list;
      this.total = res.data.data.list.length;
      console.log(res.data.data.list);
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
  },
};
</script>
<style scoped>
</style>