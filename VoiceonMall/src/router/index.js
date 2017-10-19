import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import GoodsList from './../views/GoodsList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goods/:goodsId/user/:username',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
