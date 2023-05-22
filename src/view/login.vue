<template>
  <div class="login">
    <div class="dialogIn">
      <h1>会员管理系统</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="mt30">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  userName: 'login',
  data () {
    return {
      ruleForm: {},
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm (formuserName) {
      this.$refs[formuserName].validate((valid) => {
        if (valid) {
          // 登录接口
          this.$api.common.login(this.ruleForm).then(res => {
            document.cookie = "cookie=" + res.data.token;
            // 获取用户信息
            this.$api.common.getUserInfo(res && res.data.token).then(res => {
              localStorage.setItem('admin', JSON.stringify(res.data))
              this.$message.success('登录成功')
              this.$router.push({ path: '/main/charts' }).catch(err => { console.log(err) })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/img/bg.jpg') no-repeat;
  background-size: contain;
  background-attachment: fixed;
  .dialogIn {
    width: 500px;
    height: 325px;
    background: rgba($color: #fff, $alpha: 0.55);
    border-radius: 35px;
    margin-bottom: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    box-sizing: border-box;
    .ruleForm {
      width: 100%;
      .mt30 {
        margin-top: 30px;
      }
    }
  }
}
</style>