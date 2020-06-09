<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/store/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goToAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->
      <el-table :data="goodlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品ID" prop="foodId"></el-table-column>
        <el-table-column label="商品名称" prop="foodName"></el-table-column>
        <el-table-column label="图片" prop="foodImage"></el-table-column>
        <el-table-column label="价格" prop="foodPrice"></el-table-column>
        <el-table-column label="描述" prop="foodDesc"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="编辑商品信息" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.foodId)">编辑</el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteFood(scope.row.foodId)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--    编辑商品信息的对话框-->
    <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50%"
               @close="editDialogClosed">
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="商品名称" prop="foodName">
          <el-input v-model="editForm.foodName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="foodPrice">
          <el-input v-model="editForm.foodPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="foodDesc">
          <el-input v-model="editForm.foodDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFoodInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        foodName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        foodPrice: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
          // { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
        ],
        foodDesc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      goodlist: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      // console.log(window.sessionStorage.getItem('id'))
      const { data: res } = await this.$http.post('/shop/findAllFoods/' +
        window.sessionStorage.getItem('shopId'))
      // console.log(res)
      this.goodlist = res
    },
    goToAddPage () {
      this.$router.push('/store/goods/add')
    },
    goToEditPage () {
      this.$router.push('/store/goods/edit')
    },
    async deleteFood (id) {
      // console.log(id)
      const confirmResult = await this.$confirm(
        '是否删除改商品？',
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

      const { data: res } = await this.$http.post('shop/deleteFood/' + id)
      // console.log(res)
      if (res !== 0) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      this.getGoodsList()
    },
    // 编辑商品信息
    async showEditDialog (id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.post('shop/findFood/' + id)
      // console.log(res)
      this.editForm = res
      // console.log(this.editForm)
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editFoodInfo () {
      // console.log(this.editForm.foodId)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('shop/updateFoodInfo/', this.editForm)
        console.log(res)
        if (res === -1) return this.$message.error('修改失败！')
        this.editDialogVisible = false
        if (res === 1) return this.$message.warning('没有进行任何修改！')
        this.$message.success('修改成功！')
        this.getGoodsList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
