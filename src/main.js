import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/css/global.css'
import axios from 'axios'
import { Message } from 'element-ui'
import animate from 'animate.css'
import './assets/fonts/iconfont.css'
Vue.prototype.$message = Message
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://shop.liulongbin.top/api/private/v1/'
axios.defaults.baseURL = 'http://localhost:9000/sysin'
axios.defaults.withCredentials = true;
//axios请求拦截
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
})
Vue.use(ElementUI)
Vue.use(animate)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
