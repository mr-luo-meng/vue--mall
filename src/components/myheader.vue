<template>
  <div class="view">
    <div class="safe">
      <router-link to="/login" v-if="!$store.state.token">登录</router-link>
      <span v-if="$store.state.token" @click="logout">退出登录</span>
      <router-link to="/">首页</router-link>
      <router-link to="/shopcar">购物车</router-link>
    </div>
  </div>
</template>
<script>
export default {
    methods:{
        logout(){
            this.$store.commit("update_token","");
            localStorage.removeItem("token")
        }
    }
};
</script>
<style scoped>
.safe{
    width: 1200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto; 
}
.safe a{
    padding: 0 20px ;
}
.view{
    background: #a7a8bd;
}
</style>

