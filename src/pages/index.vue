<template>
    <div class="safe">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <router-link :to="{path:'/detail',query:{goodId:item.Id}}">
                    <img v-lazy="item.imageUrl">
                    <h4>{{item.title}}</h4>
                    <p>{{item.priceStr}}</p>
                </router-link>
            </li>
        </ul>
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
        this.$store.commit("loading_show");
        this.$http.get("/api/goodlist").then((res) => {
                this.list=res.data;
                this.$store.commit("loading_hide")
        }).catch((err) => {
            console.log(err)
             this.$store.commit("loading_hide")
        });
    },
    directives:{
        lazy:{
            inserted(el,binding){
                var fn=(e)=>{
                    var st=document.body.scrollTop||document.documentElement.scrollTop;
                    var ot=el.offsetTop;
                    var h=window.innerHeight;
                    if(ot<st+h-300){
                        el.style.background="none";
                        el.src=binding.value;
                        window.removeEventListener("scroll",fn)
                    }
                }
                fn();
                window.addEventListener("scroll",fn)
            }
        }
    }

}
</script>
<style scoped>
.safe{
    width: 1200px;
    margin: 0 auto;
}
li{
    list-style-type: none;
    width: 370px;
    margin: 10px;
    padding: 5px;
    background: #fff;
    float: left;
    transition: all .5s
}
li:hover{
    transform: translateY(-15px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6)
}
ul{
    overflow: hidden;
}
li a img{
    display: block;
    width: 370px;
    height: 190px;
    background: url("../assets/images/lazyload.gif") no-repeat center center;

}
li h4,li p{
    margin-top: 10px;
}
</style>
