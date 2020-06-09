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
        <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="input" clearable>
              <el-button slot="append" icon="el-icon-search" ></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- 用户列表区域 -->
        <el-table :data="userlist" border stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="姓名" prop="shopName"></el-table-column>
          <el-table-column label="地址" prop="shopAddress"></el-table-column>
          <el-table-column label="电话" prop="shopStatus"></el-table-column>
          <el-table-column label="是否会员" prop="shopDesc"></el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      userlist: []
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    async getUsersList () {
      const { data: res } = await this.$http.get('/admin/findAllUser')
      console.log(res)
      // if (res !== 1) return this.$message.error('获取商家列表失败！')
      this.$message.success('获取用户列表成功')
      this.userlist = res
    }
  }
}
</script>

<style lang="less" scoped>
</style>
