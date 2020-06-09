<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/customer/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="名字" prop="userName">
          <el-col :span="8">
            <el-input v-model="editForm.userName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-col :span="8">
            <el-input v-model="editForm.sex"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNum">
          <el-col :span="8">
            <el-input v-model="editForm.phoneNum" type="textarea"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-col :span="8">
            <el-input v-model="editForm.address" type="textarea"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="个人描述" prop="profile">
          <el-col :span="8">
            <el-input v-model="editForm.profile" type="textarea"></el-input>
          </el-col>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="editInfo">确认</el-button>
          <el-button type="info" @click="resetEditForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editForm: {
        userName: '0',
        sex: window.sessionStorage.getItem('shopId'),
        phoneNum: '',
        address: '',
        profile: ''
      },
      editFormRules: {
        userName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' },
          { min: 2, max: 2, message: '只能为男、女中的一个值', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入电话', trigger: 'blur' },
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
  methods: {
    resetEditForm () {
      this.$refs.editFormRef.resetFields()
    },
    editInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // console.log(this.editForm)
        const { data: res } = await this.$http.post('shop/editFood', this.editForm)
        // console.log(res)
        if (res !== 0) return this.$message.error('修改失败！')
        this.$message.success('修改成功！')
        this.$router.push('/customer/info')
      })
    }
  }
}
</script>

<style scoped>

</style>
