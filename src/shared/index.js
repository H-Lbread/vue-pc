import axios from 'axios';
import api from '@/request/index';

export default {
  install(Vue) {
    Vue.prototype.$api = api;
    Vue.prototype.$axios = axios;
    Vue.prototype.$getCookie = function getCookie(key) {
      var strCookie=document.cookie;
      var arrCookie=strCookie.split("; ");
      for (var i = 0; i < arrCookie.length; i++) {
          var tmp = arrCookie[i].split('=');
          if (tmp[0] == key) {
              return tmp[1];
          }
      }
  }
  },
};
