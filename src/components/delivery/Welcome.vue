<template>
  <div>
    <h3>配送员界面！！！</h3>
    <!-- 面包屑导航区域 -->
<!--    <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--      <el-breadcrumb-item :to="{ path: '/delivery/home' }">首页</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>订单管理</el-breadcrumb-item>-->
<!--      <el-breadcrumb-item>订单列表</el-breadcrumb-item>-->
<!--    </el-breadcrumb>-->
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单ID">
                <span>{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="配送员">
                <span>{{ props.row.deliverymanName }}</span>
              </el-form-item>
              <el-form-item label="店铺">
                <span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单ID" prop="orderId" width="100px"></el-table-column>
        <el-table-column label="下单时间" prop="createTime" sortable></el-table-column>
        <el-table-column label="店铺" prop="shopName"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.status === 1">待接单</el-tag>
            <el-tag type="primary" v-else-if="scope.row.status === 2">已接单</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 3">待配送</el-tag>
            <el-tag type="primary" v-else-if="scope.row.status === 4">配送中</el-tag>
            <el-tag type="warning" v-else-if="scope.row.status === 5">待领取</el-tag>
            <el-tag type="success" v-else>已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 配送接单按钮 -->
            <el-tooltip effect="dark" content="我要接单" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-bicycle" size="mini" @click="receiveOrderById(scope.row.orderId)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderlist: []
    }
  },
  created () {
    this.getOrdersList()
  },
  methods: {
    async getOrdersList () {
      const { data: res } = await this.$http.get('deliveryman/findOrders')
      // console.log(res)
      this.$message.success('获取订单列表成功')
      this.orderlist = res
    },
    // 根据Id配送接单
    async receiveOrderById (id) {
      // console.log(id)
      const confirmResult = await this.$confirm(
        '确定接单?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果配送员确定接单，则返回值为字符串 confirm
      // 如果配送员取消了接单，则返回值为字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消接单')
      }

      const { data: res } = await this.$http.get('/deliveryman/changeOrder/' + id + '/' + window.sessionStorage.getItem('id'))
      console.log(res)
      if (res !== 1) {
        return this.$message.error('接单失败！')
      }

      this.$message.success('接单成功！')
      this.getOrdersList()
    }
  }
}
</script>

<style lang="less" scoped>
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
