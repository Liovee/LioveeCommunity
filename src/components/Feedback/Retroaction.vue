<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请求对接</el-breadcrumb-item>
      <el-breadcrumb-item>对接查看</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="userlist" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="反馈人" prop="username"> </el-table-column>
        <el-table-column label="电话号码" prop="email"> </el-table-column>
        <el-table-column label="反馈类型" prop="username"> </el-table-column>
        <el-table-column label="反馈时间" prop="username"> </el-table-column>
        <el-table-column label="反馈详情" prop="username"> </el-table-column>
        </el-table>
        <div style="width: 600px; height: 500px" ref="chart"></div>
    </el-card>
  </div>
</template>
<script>
const echarts = require("echarts");
export default {
  data() {
    return {
        userlist:[],
        
    };
  },
  methods:{
      initCharts() {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        title: { text: "请求分析可视化;数据是近六个月内 九种不同标签的个数" },
        tooltip: {},
        xAxis: {
          data: ["2021-1", "2021-2", "2021-3", "2021-4", "2021-5", "2021-6"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
  mounted() {
    this.initCharts();
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