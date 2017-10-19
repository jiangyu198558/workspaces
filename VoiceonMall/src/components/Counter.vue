<template>
  <div class="hello">
    <button @click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <p><span>{{num}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['num'],
  data () {
    return {
      num: 0
    }
  },
  methods:{
      increment(){
        this.$emit("incre");
      },
      decrement(){
        this.$emit("decre");
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
