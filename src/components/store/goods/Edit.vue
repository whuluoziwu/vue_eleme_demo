<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/store/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="商品名称" prop="foodName">
          <el-col :span="8">
            <el-input v-model="editForm.foodName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品价格" prop="foodPrice">
          <el-col :span="8">
            <el-input v-model="editForm.foodPrice"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品描述" prop="foodDesc">
          <el-col :span="8">
            <el-input v-model="editForm.foodDesc" type="textarea"></el-input>
          </el-col>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="editFoods">添加商品</el-button>
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
        foodId: '0',
        shopId: window.sessionStorage.getItem('shopId'),
        foodName: '',
        foodImage: '',
        foodPrice: '',
        foodDesc: ''
      },
      editFormRules: {
        foodName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        foodPrice: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        foodDesc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetEditForm () {
      this.$refs.editFormRef.resetFields()
    },
    editFoods () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // console.log(this.editForm)
        const { data: res } = await this.$http.post('shop/editFood', this.editForm)
        // console.log(res)
        if (res !== 0) return this.$message.error('添加失败！')
        this.$message.success('添加成功！')
        this.$router.push('/store/goods')
      })
    }
  }
}
</script>

<style scoped>

</style>
