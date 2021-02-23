import { request } from './request'

// 调用此接口 , 可获得电台推荐
export function getDjRec () {
  return request({
    url: 'dj/recommend'
  })
}

// 调用此接口 , 可获得热门电台
export function getDjHot (limit, offset) {
  return request({
    url: '/dj/hot',
    params: {
      limit,
      offset
    }
  })
}

// 调用此接口 , 可获得电台推荐类型
export function getDjCateRec () {
  return request({
    url: '/dj/category/recommend'
  })
}
