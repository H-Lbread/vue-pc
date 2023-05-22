<template>
  <div class='vip'>
    <div class="vip_title">会员管理</div>
    <!-- 筛选条件 -->
    <div class="vip_select">
      <el-input class="gap w220" v-model="selectCardNum" placeholder="会员卡号" size="normal" />
      <el-input class="gap w220" v-model="selectName" placeholder="会员名称" size="normal" />
      <el-select class="gap w120" v-model="payType" value-key="" placeholder="支付类型">
        <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker class="gap w220" v-model="birth" type="date" placeholder="出生日期">
      </el-date-picker>
      <el-button type="primary" size="default" @click="selectMember">查询</el-button>
      <el-button type="primary" size="default" @click="addMember">新增</el-button>
      <el-button size="default" @click="selectReset">重置</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table border :data="tableData" class="vip_table" height="100">
      <el-table-column align="center" width="50" label="序号">
        <template slot-scope="scope">
          {{ currentPage==1?scope.$index+1: (currentPage-1)*10+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column v-for="item in tableColumn" :key="item.label" :label="item.label" :width="item.width"
        :prop="item.prop" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delTip = true">删除</el-button>
          <!-- 删除提示框 -->
          <el-dialog :show-close="false" top="30vh" center title="删除提示" :visible.sync="delTip" width="320px">
            <p style="text-align: center;font-size: 15px;">确定删除该会员吗？</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="delTip = false">取 消</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
    <!-- 新增编辑弹框 -->
    <vip-option v-if="showEdit" :show.sync="showEdit" :memberInfo="memberInfo" @closeDialog="closeDialog" />
  </div>
</template>
<script>
import vipOption from './components/vipOption.vue'
export default {
  components: { vipOption },
  data () {
    return {
      selectCardNum: '',
      selectName: '',
      selectOption: [
        { value: '1', label: '银行卡' },
        { value: '2', label: '支付宝' },
        { value: '3', label: '微信' },
        { value: '4', label: '现金' }
      ],
      tableData: [],
      tableColumn: [
        { label: '会员卡号', width: '180', prop: 'cardNum' },
        { label: '会员姓名', width: '150', prop: 'name' },
        { label: '会员生日', width: '150', prop: 'birthday' },
        { label: '手机号码', width: '150', prop: 'phone' },
        { label: '可用积分', width: '120', prop: 'integral' },
        { label: '开卡金额', width: '120', prop: 'money' },
        { label: '支付类型', width: '120', prop: 'payType' },
        { label: '会员地址', width: '', prop: 'address' }
      ],
      currentPage: 1,
      currentSize: 10,
      totalNum: 0,
      payType: '',
      birth: '',
      showEdit: false,
      memberInfo: null,
      delTip: false
    }
  },
  computed: {},
  methods: {
    handleSizeChange (val) {
      this.currentSize = val
      this.selectMember()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.selectMember()
    },
    // 获取表格数据
    selectMember () {
      const params = {
        page: this.currentPage,
        size: this.currentSize
      }
      this.$api.common.selectMember(params).then(res => {
        if (res.code == 2000) {
          const data = res.data.rows
          this.tableData = data.map(v => {
            // 转义支付类型关系
            const filterIn = this.selectOption.find(r => r.value == v.payType)
            v.payType = filterIn.label
            return v
          })
          this.totalNum = res.data.total
        }
        else {
          this.$message.warning('数据获取失败！')
        }
      }).catch(err => this.$message.warning('网络通讯失败！'))
    },
    // 新增成员
    addMember () {
      this.memberInfo = null
      this.showEdit = true
    },
    // 编辑成员
    handleEdit (i, r) {
      this.memberInfo = r
      this.showEdit = true
    },
    //删除成员
    handleDelete (i, r) {
      this.$api.common.deleteMember(r.id).then(res => {
        if (res.code == 2000) {
          this.$message.success('会员删除成功')
          this.selectMember()
        }
        else {
          this.$message.warning('会员删除失败请重试')
        }
      }).catch(err => this.$message.warning('网络请求失败请重试'))
      this.delTip = false
    },
    // 关闭弹框并进行后续操作
    closeDialog (hadChanged) {
      this.showEdit = false
      this.memberInfo = null
      hadChanged && this.selectMember()
    },
    selectReset () {
      this.selectCardNum = ''
      this.selectName = ''
      this.payType = ''
      this.birth = ''
    }
  },
  created () {
    this.selectMember()
  }
}
</script>
  <style lang='scss' scoped>
.vip {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  &_title {
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 0 25px;
    box-sizing: border-box;
    font-size: 14px;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 3px;
      height: 14px;
      background: #31c17b;
      left: 15px;
    }
  }
  &_select {
    display: flex;
    margin: 20px 0;
    .gap {
      margin-right: 10px;
    }
    .w220 {
      width: 220px;
    }
    .w120 {
      width: 120px;
    }
  }
  &_table {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>