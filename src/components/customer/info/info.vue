<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人资料</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="goToEditPage">修改信息</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->
      <el-table :data="goodlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="userdId"></el-table-column>
        <el-table-column label="名字" prop="userName"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="电话号码" prop="phoneNum"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="个人描述" prop="profile"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        userName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
          // { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收货地址', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        profile: [
          { required: true, message: '请输入个人描述', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getPersonalInfo()
  },
  methods: {
    async getPersonalInfo () {
      // console.log(window.sessionStorage.getItem('id'))
      const { data: res } = await this.$http.post('/customer/getPersonalInfo/' +
        window.sessionStorage.getItem('usersID'))
      // console.log(res)
      this.PersonalInfo = res
    },
    goToEditPage () {
      this.$router.push('info/Edit')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
