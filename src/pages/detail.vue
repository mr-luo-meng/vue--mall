<template>
  <div>
    <img :src="item.imageUrl" alt>
    <h2>{{item.title}}</h2>
    <p>商品卖点:{{item.salePoint}}</p>
    <p>商品价格:{{item.priceStr}}</p>
    <p>好评:{{item.nice}}</p>
    <button @click="add">立即抢购</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.$store.commit("loading_show");
    this.$http
      .get("/api/detail", { params: { goodId: this.$route.query.goodId } })
      .then(res => {
        this.item = res.data[0];
        this.$store.commit("loading_hide");
      })
  },
  methods:{
      add(){
             
            if(this.$store.state.token){
               this.$store.commit("loading_show"); 
               this.$http.get("/api/add",{params:{goodId:this.$route.query.goodId,token:this.$store.state.token}}).then((res) => {
                    if(res.data.code){
                         this.$store.commit("loading_hide"); 
                        this.$alert("ok","添加成功")
                    }else{
                        this.$store.commit("update_token","");
                        localStorage.removeItem("token");
                        this.$alert("身份过期了,即将跳转到登录界面",{
                            callback:()=>{
                                this.$router.push("/login?url="+this.$route.fullpath)
                            }
                        })
                    }
               }).catch((err) => {
                   console.log(err)
               });
            }else{
                this.$alert("请先登录!",{
                   confirmButtonText:"确定"
                })
            }
            
      }
  }
};
</script>
<style scoped>
button{
    width: 200px;
    height: 50px;
    border-radius: 10px;
    background: red;
    color: #fff;
    margin-top: 50px;
    font-size: 20px;
    outline: none;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    border: none;
    cursor: pointer;
}
button:active{
    box-shadow: 0 0 0;
    transform: translate(5px 5px)
}
</style>

