<template>
    <div>
        这是一个商品列表页面
        <br>
        <span>{{$route.params.goodsId}}</span>
        <br>
        <span>{{$route.params.username}}</span>
        <router-link to="/goods/title">显示商品标题</router-link>
        <router-link to="/goods/img">显示商品图片</router-link>
        <div>
            <router-view></router-view>
        </div>
        <!-- <router-link to="/cart">购物车</router-link> -->
        <router-link v-bind:to="{name:'cart', params: {cartId: 123}}">购物车</router-link>
        <!-- <button @click="jump">button - 跳转到购物车页面</button> -->
    </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    jump(){
        //this.$router.push("/cart");
        //this.$router.push({path: "/cart?goods=123"});
        this.$router.go(-2);
    }
  }
}
</script>