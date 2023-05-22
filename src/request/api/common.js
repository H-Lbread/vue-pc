import base from '../base.js'  //导入接口域名列表
import axios from '../http.js'; //导入http中创建的axios实例

const common = {
  getUserInfo(token){ // 通过token响应用户信息
    return axios.get(`${base.entry}/user/info/${token}`)
  },
  login(params){  // 登录认证
    return axios.post(`${base.entry}/user/login`,params)
  },
  logout(params){  // 退出系统
    return axios.post(`${base.entry}/user/logout`,params)
  },
  changePwd(params){  // 根据userId修改用户密码
    return axios.put(`${base.entry}/user/pwd`,params)
  },
  checkPwd(params){  // 校验密码是否符合设置规则
    return axios.post(`${base.entry}/user/pwd`,params)
  },
  selectMember (params) {  // 会员列表查询
    const {page, size}  = params
    return axios.post(`${base.entry}/member/list/search/${page}/${size}`)
  },
  addMember(){  // 会员新增
    return axios.post(`${base.entry}/member`)
  },
  editMember(id){  // 会员编辑
    return axios.put(`${base.entry}/member/${id}`)
  },
  deleteMember(id){  // 会员删除
    return axios.delete(`${base.entry}/member/${id}`)
  },
  searchMemberInfo(id){ // 根据会员ID查询会员信息
    return axios.get(`${base.entry}/member/${id}`)
  }
}

export default common