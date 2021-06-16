// module.exports = () => ({
//   plugins: [
//     require('postcss-plugin-px2rem')({
//       rootValue: 37.5,
//       exclude: /node_modules|folder_name/i,
//       mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
//       // selectorBlackList: ['van-'], // van- my- 开头的选择器不进行适配
//       selectorBlackList: ['.ignore', '.hairlines', 'van'],
//       minPixelValue: 0 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
//     })
//   ]
// })

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      exclude: /node_modules|folder_name/i,
      selectorBlackList: [], // van- my- 开头的选择器不进行适配s
      propList: ['*']
    }
  }
}
