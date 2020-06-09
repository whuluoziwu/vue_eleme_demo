<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 注册表单区域 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRulers" label-width="0px" class="register_form">
        <el-form-item label="用户ID" label-width="70px" prop="userId">
          <el-input v-model="registerForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="70px" prop="userName">
          <el-input v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="password">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="70px" prop="phoneNumber">
          <el-input v-model="registerForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="70px" prop="sex">
          <el-switch v-model="registerForm.sex"
                     active-text="女"
                     inactive-text="男"
                     active-value="女"
                     inactive-value="男">
          </el-switch>
        </el-form-item>
        <el-form-item label="类型" label-width="70px" prop="type">
          <el-radio-group v-model="registerForm.type">
            <el-radio label="2">我是用户</el-radio>
            <el-radio label="1">我是商家</el-radio>
            <el-radio label="3">我是配送员</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="warning" @click="regiser">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
          <el-button type="danger" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 这是注册表单的数据绑定对象
      registerForm: {
        userId: '',
        userName: '',
        password: '',
        type: '',
        sex: '男',
        // profile: '',
        phoneNumber: '15666666666'
      },
      // 这是表单的验证规则对象
      registerFormRulers: {
        // 验证用户Id是否合法
        userId: [
          { required: true, message: '请输入用户Id', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证用户名是否合法
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        // 验证电话是否合法
        phoneNumber: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置注册表单
    resetRegisterForm () {
      this.$refs.registerFormRef.resetFields()
    },
    back () {
      this.$router.push('/login')
    },
    regiser () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        // console.log(JSON.stringify(this.registerForm))
        // console.log(this.registerForm)
        // console.log({
        //   userId: this.registerForm.userId,
        //   userName: this.registerForm.userName,
        //   password: this.registerForm.password,
        //   type: this.registerForm.type,
        //   sex: this.registerForm.sex,
        //   phoneNumber: this.phoneNumber
        // })
        const { data: res } = await this.$http.post('/account/register',
          {
            userId: this.registerForm.userId,
            userName: this.registerForm.userName,
            password: this.registerForm.password,
            type: this.registerForm.type,
            sex: this.registerForm.sex,
            phoneNumber: this.phoneNumber
          })
        // console.log(res)
        if (res !== 0) return this.$message.error('注册失败！')
        this.$message.success('注册成功！')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .register_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .register_box {
    width: 450px;
    height: 500px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .register_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
