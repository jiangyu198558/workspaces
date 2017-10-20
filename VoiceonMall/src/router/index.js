import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import GoodsList from './../views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      //path: '/goods/:goodsId/user/:username',
      //path: '/goods',
      path: '/',
      name: 'GoodsList',
      components: {
        default: GoodsList,
        title: Title,
        img: Image
      }
      //component: GoodsList// ,
      // children: [
      //   {
      //       path: 'title',
      //       name: 'title',
      //       component: Title
      //   },
      //   {
      //       path: 'img',
      //       name: 'img',
      //       component: Image
      //   }
      //]
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: Cart
    }
  ]
})
