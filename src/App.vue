<template>
  <div id="app">
    <myheader></myheader>
    <router-view/>
    <loading></loading>
    <totop></totop>
  </div>
</template>

<script>
import loading from "@/components/loading"
import myheader from "@/components/myheader"
import totop from "@/components/totop"
export default {
  name: 'App',
  components:{loading,myheader,totop},
  created(){
    this.$store.commit("update_token",localStorage["token"])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
