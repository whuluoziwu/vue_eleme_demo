import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/fonts/iconfont.css' // 导入字体图标
import './assets/css/global.css' // 导入全局样式表
import axios from 'axios'
import qs from 'querystring'

// 配置请求的跟路径 // http://timemeetyou.com:8889/api/private/v1/
axios.defaults.baseURL = 'http://123.57.89.111:8080/breakfast/'

// 每次请求前加上token
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
