
var path = require('path') // 导入node 一个默认模块 解析目录相关
function getPath(src) {
  // __dirname// 当前文件的绝对路径
  return path.join(__dirname, src)
}
module.exports = {
  chainWebpack(config) { // config是webpack默认的配置对象
    // 1.获取webpack对svg的解析的loader
    config.module
      .rule('svg')
      .exclude.add(getPath('src/icons/svg'))
      .end()
    // 2.禁用loader 对svg的解析exclude.add(getPath('src/icons/svg'))
    // .end()是 结束
    // 3.配置新的loader对svg的解析
    config.module
      .rule('icons') // 新增一个名字叫icons的rule规则
      .test(/\.svg$/) // 解析什么文件
      .include.add(getPath('src/icons/svg')) // 处理那个目录下
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 配置代理
  devServer: {
    proxy: {
      // 只代理以apl开头的网络请求
      '/api': {
        // 代理目标地址
        target: 'https://api.imooc-admin.lgdsunday.club',
        // 是否开启代理
        changeOrigin: true
        // 重写url
        // pathRewrite: { '^/api': '' }
      }
    }
  }

}
