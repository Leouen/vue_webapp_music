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
// 热门歌单
export function getHotSheet (order, cat = '全部', limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}
// 推荐歌单
export function personalized (limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}
// 新歌速递
export function getSongsTop (type) {
  return request({
    url: '/top/song',
    params: {
      type
    }
  })
}
// 推荐电台 播客合辑
export function getdjprogram (limit) {
  return request({
    url: '/personalized/djprogram',
    params: {
      limit
    }
  })
}
