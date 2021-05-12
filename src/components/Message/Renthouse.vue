<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布</el-breadcrumb-item>
      <el-breadcrumb-item>企业招聘</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-button type="primary" @click="addDialogVisible = true">
            添加租房信息</el-button
          >
          <el-table :data="userlist" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="联系人" prop="username"> </el-table-column>
        <el-table-column label="房间号" prop="email"> </el-table-column>
        <el-table-column label="联系电话" prop="mobile"> </el-table-column>
        <el-table-column label="意向租房人" prop="username"> </el-table-column>
        <el-table-column label="状态" > </el-table-column>
        </el-table>
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="联系人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系电话" >
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input></el-input>
        </el-form-item>
        <!-- 底部区域 -->
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false"
            >确 定</el-button
          >
      </el-form>
    </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
        userlist:[],
        addDialogVisible:false,
        addForm:{
            name:"",
            phone:"",
            address:""
        }
    };
  },
};
</script>
<style scoped>

.el-input__inner {
  height: 200px !important;
}
.punlishB {
  margin-left: 1200px;
}
.el-button {
  /* margin-left:1200px;*/
  margin-top: 20px;
}
</style>