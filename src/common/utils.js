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
function formatDate (date) {
  date = new Date(date)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m1 = date.getMinutes()
  var s = date.getSeconds()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s
}
console.log(formatDate(567964800000))// 2018-03-23 13:35:47  参数为Number
