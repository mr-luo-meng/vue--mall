<template>
    <div class="view">
        <div v-show="!$store.state.token" class="tip">
            您还没有登录，快去登录吧<router-link to="/login?url=/shopcar">登录</router-link>
        </div>
        <div v-show="$store.state.token">
            <div v-if="list.length">
                <ul>
                   <div class="safe">
                        <li v-for="(item,index) in list" :key="index">
                            <img :src="item.imageUrl" alt="">
                            <span>商品：{{item.title}}</span>
                            <span>价格：{{item.priceStr}}</span>
                            <button @click="del(item.Id,index)">删除</button>
                        </li>
                   </div>
                </ul>
            </div>
            <div class="tip" v-else>
                您还没有选购商品，快去抢购吧<router-link to="/">抢购</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        if(this.$store.state.token){
             this.$store.commit("loading_show"); 
            this.$http.get("/api/shoplist",{params:{token:this.$store.state.token}}).then((res) => {
                this.list=res.data
                console.log(res.data)
                 this.$store.commit("loading_hide"); 
            }).catch((err) => {
            console.log(err)     
            });
        }
    },
    methods:{
        del(id,index){
                this.$store.commit("loading_show"); 
            this.$http.get("/api/del",{params:{token:this.$store.state.token,goodId:id}}).then((res) => {
               if(res.data.code){
                   this.list.splice(index,1)
                    this.$store.commit("loading_hide");
                    this.$alert("删除成功！",{
                        confirmButtonText:"ok"
                    })
               }else{
                   this.$alert("警告","删除失败请重试",{
                    confirmButtonText:"Yes"
                }
                   )
               }
            }).catch((err) => {
               console.log(err) 
            });
        }
    }
}
</script>
<style scoped>
.view{
    width: 1200px;
    margin: 0 auto;
}
.tip{
    height: 500px;
    line-height: 500px;
}
.safe{
    width: 1200px;
    margin: 10px auto;
    overflow: hidden;
}
.safe img{
    width: 500px;
    float: left;
}
button{
    width: 200px;
    height: 50px;
    outline: none;
    background: red;
    color: #fff;
    text-align: center;
    line-height: 50px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5)
}
li{
    float: left;
}
</style>

