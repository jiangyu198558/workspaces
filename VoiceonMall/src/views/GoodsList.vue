<template>
    <div>
        这是一个商品列表页面
        <br>
        <span>{{$route.params.goodsId}}</span>
        <br>
        <span>{{$route.params.username}}</span>
    </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>