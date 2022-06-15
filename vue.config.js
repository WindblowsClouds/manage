const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
    //解决跨域
    devServer: {
      proxy: {
        //当路径中带有'/api'时，代理服务器就回工作
        '/api': {
          target: 'http://gmall-h5-api.atguigu.cn',
          //路径重写
          /* pathRewrite: { '^/api': '' }, */
        },
      },
    },
})
