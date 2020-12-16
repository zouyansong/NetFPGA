# qqshare

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 本地测试向后端服务器请求出错
可检查config/index.js 文件里的proxyTable中的target是否为127.0.0.1:8081/api
（因为有时候连接真实服务器测试时可能会忘了修改回来）
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
