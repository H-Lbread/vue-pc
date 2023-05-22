<template>
  <div class='main'>
    <!-- 导航标题 -->
    <div class="main_nav">
      <div class="title">会员管理系统</div>
      <div class="name">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo && userInfo.name }} <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogFormVisible = true">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main_body">
      <!-- 菜单 -->
      <div class="main_body_type">
        <router-link v-for="v in navObj" :key="v.path" class="linkTo" :to="v.path">
          <i :class="currentRoute == v.path?`${v.icon} active`:v.icon" />
          <span :class="{active:currentRoute == v.path}" v-text="v.name" />
        </router-link>
      </div>
      <!-- 内嵌路由 -->
      <div class="main_body_router">
        <router-view />
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="350px" top="25vh">
      <el-input v-model="rePwd" size="normal" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      name: '',
      userInfo: {},
      dialogFormVisible: false,
      rePwd: '',
      navObj: [
        { name: '首页', path: '/main/charts', icon: 'el-icon-message-solid' },
        { name: '会员管理', path: '/main/vipManager', icon: 'el-icon-s-platform' }
      ]
    }
  },
  computed: {
    currentRoute () {
      return this.$route.path
    }
  },
  methods: {
    changePwd () {
      if (!this.rePwd) {
        this.$message.warning('密码不能为空！')
        return
      }
      // 校验密码格式
      const info = {
        userId: this.userInfo.id,
        password: this.rePwd
      }
      this.$api.common.checkPwd(info).then(res => {
        if (res.flag) {
          this.$api.common.changePwd(info).then(ros => {
            if (ros.flag) {
              this.clearCookie()
              this.$message.success('密码修改成功！')
              localStorage.removeItem('admin')
              this.$router.push(`/`)
            }
            else {
              this.$$message.warning('密码修改失败请重试')
            }

          })
        }
        else {
          this.$$message.warning('密码格式不正确')
        }
      })
    },
    clearCookie () {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
          document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString()
          document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString()
        }
      }
    },
    // 退出登录
    logout () {
      const token = this.$getCookie('cookie')
      this.$api.common.logout({ token: token }).then(res => {
        if (res) {
          this.clearCookie()
          localStorage.removeItem('admin')
          this.$message.success('退出登录成功')
          this.$router.push(`/`)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('admin'))
  }
}
</script>
  <style lang='scss' scoped>
.main {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  &_nav {
    width: 100%;
    min-height: 50px;
    background: #2d3a4b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 17px;
    .title {
      color: #fff;
      font-weight: bold;
    }
    .name {
      .el-dropdown {
        span {
          color: #fff;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  &_body {
    width: 100%;
    flex: 1;
    flex-shrink: 0;
    display: flex;
    &_type {
      min-width: 180px;
      height: 100%;
      background: #545c64;
      overflow-y: auto;
      padding: 5px 20px;
      box-sizing: border-box;
      .linkTo {
        display: flex;
        width: 100%;
        height: 50px;
        align-items: center;
        font-size: 14px;
        text-decoration: none;
        color: #fff;
        .active {
          color: #ffd04b;
          i {
            &:before {
              color: #ffd04b;
            }
          }
        }
        i {
          margin-right: 8px;
        }
        &:hover {
          text-decoration: none;
        }
      }
    }
    &_router {
      flex: 1;
      width: 1px;
      flex-shrink: 0;
    }
  }
}
</style>