module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap(args => {
      args[0].title = 'vue-music'
      args[0].cdn = {
        css: ['//at.alicdn.com/t/font_2363713_2ru36rz8fqg.css'],
        js: ['//at.alicdn.com/t/font_2363713_2ru36rz8fqg.js']
      }
      return args
    })
  },
  pluginOptions: {}
}
