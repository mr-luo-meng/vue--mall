
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index.js'
import "@/assets/common.css"
import axios from "axios"
import {MessageBox} from "element-ui"
Vue.config.productionTip = false
Vue.prototype.$alert=MessageBox.alert;
Vue.prototype.$http=axios
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
