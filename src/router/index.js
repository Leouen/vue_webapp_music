import Vue from 'vue'
import VueRouter from 'vue-router'

// 0. 懒加载导包
const Home = () => import('../views/home/Home')
const Podcast = () => import('../views/podcast/Podcast')
const Profile = () => import('../views/profile/Profile')
const Karaoke = () => import('../views/karaoke/Karaoke')
const Friends = () => import('../views/friends/Friends')
// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建路由对象
const routes = [
  // 0. 底侧主导航栏
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { index: 1 }
  },
  {
    path: '/podcast',
    component: Podcast,
    meta: { index: 2 }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { index: 3 }
  },
  {
    path: '/karaoke',
    component: Karaoke,
    meta: { index: 4 }
  },
  {
    path: '/friends',
    component: Friends,
    meta: { index: 5 }
  },
  // 共用：登陆
  { path: '/UserLogin', component: () => import('components/content/userLogin/UserLogin') },
  { path: '/PhoneLogin', component: () => import('components/content/userLogin/PhoneLogin') },
  { path: '/MailLogin', component: () => import('components/content/userLogin/MailLogin') },
  { path: '/PhoneLoginVerify', component: () => import('components/content/userLogin/PhoneLoginVerify') },
  // 歌单页面
  { path: '/musicSheet/:id&:isAlbum', component: () => import('components/content/musicList/MusicSheet') }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
