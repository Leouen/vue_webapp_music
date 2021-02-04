import { request } from './request'

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}
// 轮播图请求
export function getBanner (type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}
