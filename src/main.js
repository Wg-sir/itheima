import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载vant全局样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载动态REM 基准值
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'
Vue.config.productionTip = false
// 注册使用Vant组件库
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
