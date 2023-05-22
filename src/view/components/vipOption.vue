<template>
  <div class='vipOption'>
    <el-dialog :title="titleIn" :visible.sync="show" width="500px" top="10vh" :before-close="closeIn">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="ruleForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="ruleForm.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="ruleForm.payType" placeholder="请选择支付类型">
            <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="ruleForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeIn">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    memberInfo: {
      type: Object,
    }
  },
  data () {
    return {
      titleIn: '',
      selectOption: [
        { value: '1', label: '银行卡' },
        { value: '2', label: '支付宝' },
        { value: '3', label: '微信' },
        { value: '4', label: '现金' }
      ],
      ruleForm: {},
      rules: {
        cardNum: [
          { required: true, message: '请输入会员卡号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入会员姓名', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择支付类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 会员编辑
          if (this.memberInfo) {
            this.$api.common.editMember(this.memberInfo.id).then(res => {
              if (res.code == 2000) {
                this.$message.success('会员编辑成功')
              }
              else {
                this.$message.warning('会员编辑失败请重试')
              }
            }).catch(err => this.$message.warning('网络请求失败请重试'))
          }
          // 会员新增
          else {
            this.$api.common.addMember(this.ruleForm).then(res => {
              if (res.code == 2000) {
                this.$message.success('会员新增成功')
              }
              else {
                this.$message.warning('会员新增失败请重试')
              }
            }).catch(err => this.$message.warning('网络请求失败请重试'))
          }
          this.$emit('closeDialog', true)
        } else {
          return false
        }
      });
    },
    closeIn () {
      this.$emit('closeDialog')
    }
  },
  created () {
    this.titleIn = this.memberInfo ? '会员编辑' : '会员新增'
    if (this.memberInfo) this.ruleForm = JSON.parse(JSON.stringify(this.memberInfo))
  },
  mounted () {
  }
}
</script>
  <style lang='scss' scoped>
.vipOption {
  box-sizing: border-box;
}
</style>