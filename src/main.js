import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'swiper/css/swiper.css'

// 只是引入基础样式
// import 'vant/lib/style/base.css'
// 引入全部样式
// import 'vant/lib/index.less'

// 自动按需引入组件,然后对它-全局注册
import { Button, Form, Field, Popup, NavBar } from 'vant'

Vue.use(NavBar)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)

Vue.prototype.$Bus = new Vue() // 创建全局事件总线

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
