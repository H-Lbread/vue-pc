import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login.vue'
import main from '../view/main.vue'
import charts from '../view/charts.vue'
import vipManager from '../view/vipManager.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    redirect:"/charts",
    children: [
      { path: 'charts', component: charts },
      { path: 'vipManager', component: vipManager },
    ],
  }
]

const router = new VueRouter({
  routes,
})

function getCookie(key) {
  var strCookie=document.cookie;
  var arrCookie=strCookie.split("; ");
  for (var i = 0; i < arrCookie.length; i++) {
      var tmp = arrCookie[i].split('=');
      if (tmp[0] == key) {
          return tmp[1];
      }
  }
}

router.beforeEach((to, from, next) => {
  // 登录守卫
  if (to.path != '/') {
    if (getCookie('cookie')) {
      next()
    }
    else {
      next({path:'/'})
    }
  }
  else {
    // cookie存在则保持登录状态
    if (getCookie('cookie')) {
      next({path:'/main/charts'})
    }
    else {
      next()
    }
  }
})

export default router
