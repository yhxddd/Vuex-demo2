import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.axios = axios
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
