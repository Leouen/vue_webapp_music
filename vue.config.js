const path = require('path')
const themePath = path.resolve(__dirname, './src/assets/css/theme.less')

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  },
  publicPath: '/',
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
        css: ['//at.alicdn.com/t/font_2363713_fy0om01giie.css'],
        js: ['//at.alicdn.com/t/font_2363713_fy0om01giie.js']
      }
      return args
    })
  },
  pluginOptions: {},
  lintOnSave: false
}
