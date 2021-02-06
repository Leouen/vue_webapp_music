import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
import 'assets/mui/css/mui.css'
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
