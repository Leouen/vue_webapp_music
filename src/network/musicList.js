
import { request } from './request'

// 获取歌单详情
export function getlistDetial (id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取歌单评论
export function getSheetComment (id, limit = 25, offset) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset
    }
  })
}

// 收藏/不收藏歌单
export function collectionSheet (t, id) {
  return request({
    url: '/playlist/subscribe',
    params: {
      t,
      id
    }
  })
}

// 获取每日推荐歌曲 需要先登陆

export function getDailySong  () {
  return request({
    url: '/recommend/songs',
  })
}
// 获取排行榜

export function getRank () {
  return request({
    url: '/toplist/detail',
  })
}
///personal_fm 私人FM
export function getPersonal_fm () {
  return request({
    url: '/personal_fm ',
  })
}