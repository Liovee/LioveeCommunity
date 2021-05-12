<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布</el-breadcrumb-item>
      <el-breadcrumb-item>社区信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <textarea
        v-model="content"
        class="textInput"
        placeholder="请输入您要发布的信息..."
      ></textarea>
      <input type="file" name="test" @change="popFileName" id="file" />
      <el-button class="punlishB" type="primary" @click="publish"
        >发布</el-button
      >
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      file_path:"D:/html/My-graduate-demo(1)/file"
    };
  },
  methods: {
    getFileName(path) {
      var pos1 = path.lastIndexOf("/");
      var pos2 = path.lastIndexOf("\\");
      var pos = Math.max(pos1, pos2);
      if (pos < 0) return path;
      else return path.substring(pos + 1);
    },
    popFileName() {
      var selectedFile = document.getElementById("file").files[0];
      var reader = new FileReader();
      reader.readAsText(selectedFile); 
      reader.onload = function () {
      };
      // var path = document.getElementById("file").value;
      // this.file_path = path
      
    },
    async publish() {
      var selectedFile = document.getElementById("file").files[0];
      var publishTime = new Date()
      var flag = 1
      var userId = localStorage.getItem('userId')
      var messageVo  = new FormData();
      messageVo.set("userId",userId);
      messageVo.set("file_path",this.file_path);
      console.log(this.file_path)
      messageVo.set("flag",flag);
      messageVo.set("publishTime",publishTime);
      messageVo.set("selectedFile",selectedFile);
      console.log(messageVo)
      const res =  await axios({
        url:"/messagePublish/insertCommunityInformation",
        methods:'post',
        param:messageVo 
      })
      console.log(res)
    },
  },
};
</script>
<style scoped>
.textInput {
  width: 95%;
  height: 200px;
}
.el-input {
  min-height: 300px;
}
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