<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" class="card">
        <div class="user">
          <div class="imgbox">
            <img :src="imgUrl" class="userImg" />
          </div>
          <div class="userInfo">
            <p class="name">晚风</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间: <span>2020.1.1</span></p>
          <p>上次登录地点: <span>中国</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 415px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          style="height:80px"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height: 210px">
        <div style="height:210px" ref="echarts">

        </div>
      </el-card>
      <div class="graph">
       <!--  //柱状图 -->
        <el-card style="height: 200px">
          <div style="height:200px" ref="userEcharts"></div>
        </el-card>
        <!-- 饼图 -->
        <el-card style="height: 200px">
          <div style="height:200px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import home from '@/store/home';
import {mapGetters} from 'vuex'
export default {
  name: "home",
  data() {
    return {
      imgUrl: require("@/assets/images/wind.png"),
      tableLable: {
        name: "商品",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("gettableInfo")
    this.$store.dispatch("getdataInfo")
  },
  computed:{
    //表格数据
    tableData(){
      return this.$store.state.home.tableData
    },
    ...mapGetters(["orderData","userData","videoData"]),
    
  },
  methods: {

  },
  watch:{
    //折线图实现，使用nexttick解决了未返回数据时，初次挂载为空白页面以及不能读取属性的error错误提示
    orderData:{
      /* immediate:true, */
      handler(newvalue,oldvalue){
        this.$nextTick(()=>{
              const order=this.orderData.List
      const keyArray=Object.keys(order[0])
      const xData=this.orderData.date
      const series=[]
      keyArray.forEach(key=>{
        series.push({
          name:key,
          data:order.map(item=>item[key]),
          type:'line'
        })
      })
      const option={
        xAxis:{
          data:xData
        },
        yAxis:{},
        legend:{
          data:keyArray
        },
        series
      }
      const E= echarts.init(this.$refs.echarts)
      E.setOption(option)
        })
      }
    },
    //柱状图实现
    userData:{
      handler(newvalue,oldvalue){
        this.$nextTick(()=>{
          const userOption={
            legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: this.userData.map(item=>item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:"新增用户",
              data:this.userData.map(item=>item.new),
              type:"bar"
            },
            {
              name:"活跃用户",
              data:this.userData.map(item=>item.active),
              type:"bar"
            }
          ],
          }
          const U=echarts.init(this.$refs.userEcharts)
          U.setOption(userOption)
          
        })
      }
    },
    //饼图
    videoData:{
      handler(newvalue,oldvalue){
        const videoOption={
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data:this.videoData,
              type:'pie'
            }
          ],
        }
        const V=echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
    }

  }
  
};
</script>

<style lang="less" scoped>
.el-col {
  margin-top: 20px;
  .card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .user {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebeef5;
      .imgbox {
        float: left;
        .userImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      .userInfo {
        float: right;
        margin-left: 50px;

        .name {
          margin-top: 5px;
        }

        .name {
          color: aquamarine;
          font-size: 20px;
        }
        .access {
          font-size: 8px;
          color: cyan;
          margin-top: 10px;
          width: 150px;
        }
      }
    }
  }
}
</style>