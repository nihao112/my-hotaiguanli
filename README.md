# my-hotaiguanli

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/)

### webpack 配置说明

eslint-disable 意思对于以下不进行 esline 检测
eslint-enable 意思是检测结束接着执行以下代码
入口 main.js(导入模块：js 模块)--》webpack 出口 js/app.js 文件
css 文件，字体 svg-->loader-->对应的 js 模块--webpack
不需要配置，直接使用，因为项目环境已经直接配置了常见的 loader
svg 导入后： 1.是由 file-loader 变成一个/img/user.沙汪值.svg.js 模块, 2.可以按照 img 方式加载
缺点：file-loader 转化的 js 模块不能动态修改一个图片的颜色
不利于封装一个全局组件
查看 webpack 的默认配置指令
vue inspect 查看默认的 webpack 配置
vue inspect --rules 查看所有的 loader
vue inspect --rule svg 查看配置 svg 的 loader
配置 webpack 1.在项目根目录创建 vue.config.js 2.这个文件是 node 加载的 commonjs
导出一个配置配置对象, 作为 webpack 的配置
module.exports={} 3.修改 webpack 的配置 1.禁用 file-loader 对某个目录下 svg 的解析 2.下载 loader
npm i -D svg-sprite-loader //-D 保存在 devlopment 依赖中

### 用户鉴权

当用户未登录时，只能进入 login 页面
用户登录后 token 未过期之前，不允许进入 login 页面
