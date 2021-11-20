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

### 退出业务

token 的作用
1.token 是由后台再首次登录的时候生成，通过 response 响应给前端 意思是说一个 token 同时再前后端都有保存
2.token 表示用户的身份，是一个用户的令牌，对于服务器而言，只认 token 不认人，意思说别人获取你的 token，以你的身份就能登录服务器，获取你的敏感数据所以处于安全角度，需要对 token 进行一些安全策略的省略
常见处理方式：
动态 token
时效 token （现在使用）
刷新 token 2.常见的退出方式：
主动退出：用户手动点击退出按钮，执行退出登录 （前端处理）
被动退出：
token 时效：（超出了 token 有效期，失去服务器对用户校验身份的条件）
1。前端获取的 token 过期（前端处理） 2.后端生成的 token 过期 （后端处理）
单点登录：(后端处理)
在你已经登录的情况下。你或者是别人再别人的设备上再次登录，
你当前的登录状态就会被顶下来

总结： 1.前端只能出路主动退出和前端 token 失效
也是要你执行前的退出操作 2.如果是后端 token 失效和单端登录
也特定的状态码通知前端
code 401 后台 token 失效
code 405 单点登录
也就是你执行前的退出操作

3.退出登录操作逻辑 1.清理掉用户的缓存数据 2.清理该用户的权限 3.返回到登录页面

4.主动退出(前端操作)
5.token 失效(前端) 1.用户登录获得到 token 的时候记录事件 2.指定 token 生效时间 2 小时 3.在调接口的的时候需要带 token，需要判断这个 token 时候再有效期之内
