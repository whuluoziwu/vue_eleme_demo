<template>
  <div>
    <h3>欢迎你的到来</h3>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 商品列表区域 -->
      <el-table :data="storeInfo" border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.shopAddress }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.shopStatus }}</span>
              </el-form-item>
              <el-form-item label="店铺描述">
                <span>{{ props.row.shopDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="店铺ID" prop="shopId" width="100px"></el-table-column>
        <el-table-column label="店铺名称" prop="shopName" sortable></el-table-column>
        <el-table-column label="店铺地址" prop="shopAddress"></el-table-column>
        <el-table-column label="状态" prop="shopStatus"></el-table-column>
        <el-table-column label="操作">
          <template>
            <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--    编辑商家信息的对话框-->
    <el-dialog title="修改商家信息" :visible.sync="editDialogVisible" width="50%"
    @close="editDialogClosed">
      <el-form ref="editFormRef" :rules="editFormRules" :model="editForm" label-width="80px">
        <el-form-item label="店铺ID">
          <el-input v-model="editForm.shopId" disabled></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model="editForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="shopAddress">
          <el-input v-model="editForm.shopAddress"></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" prop="shopStatus">
          <el-input v-model="editForm.shopStatus"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述" prop="shopDesc">
          <el-input v-model="editForm.shopDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStoreInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      storeInfo: [],
      editForm: {},
      editFormRules: {
        // 验证用户Id是否合法
        shopName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证用户名是否合法
        shopAddress: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        shopStatus: [
          { required: true, message: '请选择店铺状态', trigger: 'blur' }
        ],
        shopDesc: [
          { required: true, message: '请输入店铺描述', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getStoreInfo()
  },
  methods: {
    async getStoreInfo () {
      const { data: res } = await this.$http.post('shop/findShop/' + window.sessionStorage.getItem('id'))
      // console.log(res)
      this.storeInfo = [res]
      // 存放shopId，以便其他接口的使用
      window.sessionStorage.setItem('shopId', res.shopId)
    },
    // 编辑商家信息
    async showEditDialog () {
      this.editDialogVisible = true
      const { data: res } = await this.$http.post('shop/findShop/' + window.sessionStorage.getItem('id'))
      // console.log(res)
      this.editForm = res
      // console.log(this.editForm)
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editStoreInfo () {
      // console.log(this.editForm)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('shop/updateShopInfo', this.editForm)
        console.log(res)
        if (res === -1) return this.$message.error('修改失败！')
        this.editDialogVisible = false
        if (res === 1) return this.$message.warning('没有进行任何修改！')
        this.$message.success('修改成功！')
        this.getStoreInfo()
      })
    }
  }
}
</script>

<style scoped>
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
