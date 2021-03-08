// 播放数单位转换
export function toStringNum (num) {
  if (num > 100000 && num < 999999) {
    let str = num.toString()
    let str2 = str.substring(2)
    let result = str.replace(str2, '万')
    return result
  }

  if (num > 1000000 && num < 9999999) {
    let str = num.toString()
    let str2 = str.substring(3)
    let result = str.replace(str2, '万')
    return result
  }
  // let toStr = parseInt(num)
  if (num > 10000000 && num < 99999999) {
    let str = num.toString()
    let str2 = str.substring(4)
    let result = str.replace(str2, '万')
    return result
  }

  if (num > 100000000) {
    let str = num.toString()
    let str2 = str.substring(1)
    let result = str.replace(str2, '亿')
    let result2 = result.slice(0, 1) + '.' + result.slice(0)
    return result2
  }
  return num
}

// 时间转换工具
export function formatDate (date) {
  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  var s = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return y + '年' + m + '月' + d + '日 '
}
// console.log(formatDate(567964800000))// 2018-03-23 13:35:47  参数为Number

/**
 * 将秒转换为 分:秒
 * s int 秒数
*/
export function toMs (endTime) {
  let secondTime = parseInt(endTime)// 将传入的秒的值转化为Number
  let min = 0// 初始化分
  let h = 0// 初始化小时
  let result = ''
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    min = parseInt(secondTime / 60)// 获取分钟，除以60取整数，得到整数分钟
    secondTime = parseInt(secondTime % 60)// 获取秒数，秒数取佘，得到整数秒数
    if (min > 60) { // 如果分钟大于60，将分钟转换成小时
      h = parseInt(min / 60)// 获取小时，获取分钟除以60，得到整数小时
      min = parseInt(min % 60) // 获取小时后取佘的分，获取分钟除以60取佘的分
    }
  }
  result = `${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
  return result
}
