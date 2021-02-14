import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'swiper/css/swiper.css'
import 'vant/lib/style/base.css'
import { Lazyload } from 'vant'

Vue.config.productionTip = false
Vue.use(Lazyload, {
  lazyComponent: true
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
