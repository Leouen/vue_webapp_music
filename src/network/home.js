import { request } from './request'

// 轮播图请求
export function getBanner (type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}
// 可获取APP首页圆形图标入口列表
export function getBall (type) {
  return request({
    url: '/homepage/dragon/ball',
    params: {
      type
    }
  })
}
