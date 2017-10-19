# y

> VoiceonMall

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
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



第三章 Vue-router
1、路由基础介绍：路由是根据不同的url地址展示不同的内容或页面

在单页面应用，大部分页面结构不变，只改变部分内容的使用。

优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户
缺点：不利于SEO；使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存；单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置；

vue-router用来构建spa
<router-link></router-link>或者this.$router.push({path: ''}) 跳转
<router-view></router-view> 组件渲染

动态路由匹配  
嵌套路由
编程式路由
命名路由和命名试图
