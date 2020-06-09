<template>
  <div>
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
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="操作">
          <template>
            <!-- 配送完成按钮 -->
            <el-tooltip effect="dark" content="配送完成" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-check" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style scoped>

</style>
