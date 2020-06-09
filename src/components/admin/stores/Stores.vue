<template>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="Name.shopName" clearable @clear="getStoresList">
              <el-button slot="append" icon="el-icon-search" @click="findAllByShopName"></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- 商家列表区域 -->
        <el-table :data="storelist" border stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="ID" prop="shopId"></el-table-column>
          <el-table-column label="商家名称" prop="shopName"></el-table-column>
          <el-table-column label="地址" prop="shopAddress"></el-table-column>
          <el-table-column label="状态" prop="shopStatus">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.shopStatus === 1">营业中</el-tag>
              <el-tag type="info" v-else-if="scope.row.shopStatus === 2">停业</el-tag>
              <el-tag type="danger" v-else>封号</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="描述" prop="shopDesc"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-tooltip effect="dark" content="改变商家状态" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-warning-outline" size="mini" @click="changeStatusById(scope.row.shopId)"></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
<!--              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeStoreById(scope.row.id)"></el-button>-->
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
      Name: {
        shopName: ''
      },
      ID: {
        shopId: ''
      },
      storelist: []
    }
  },
  created () {
    this.getStoresList()
  },
  methods: {
    async getStoresList () { // '/customer/getShopList'
      const { data: res } = await this.$http.get('/admin/findAllShop')
      // console.log(res)
      // if (res !== 1) return this.$message.error('获取商家列表失败！')
      this.$message.success('获取商家列表成功')
      this.storelist = res
    },
    // 根据商家名称查询
    async findAllByShopName () {
      console.log(JSON.stringify(this.Name))
      const { data: res } = await this.$http.post('/admin/findAllByShopName', this.Name)
      // console.log(res)
      // if (res !== 1) return this.$message.error('查询商家列表失败！')
      this.$message.success('查询商家列表成功')
      this.storelist = res
    },
    // 根据Id修改商家的状态（不封号改为封号，封号的则解封
    async changeStatusById (id) {
      this.ID.shopId = id
      // console.log(this.ID)
      // 弹框询问管理员是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将改变商家状态, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消修改')
      }

      const { data: res } = await this.$http.post('/admin/changeShopStatus', this.ID)

      if (res !== 1) {
        return this.$message.error('修改状态失败！')
      }

      this.$message.success('修改状态成功！')
      this.getStoresList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
