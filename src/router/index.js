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
    component: Home
  },
  {
    path: '/karaoke',
    component: Karaoke
  },
  {
    path: '/friends',
    component: Friends
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/podcast',
    component: Podcast
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
