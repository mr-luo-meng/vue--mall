<template>
    <div class="view">
        <div class="btn">
            <div class="btn_c" :class="{con:flag}" @click="flag=true">登录</div>
            <div class="btn_c" :class="{con:!flag}" @click="flag=false">注册</div>
        </div>
        <div class="group" v-show="flag">
            <p>
                <input type="text" v-model="login_user" placeholder="请输入账号">
            </p>
            <p>
                <input type="password" v-model="login_pwd" placeholder="请输入密码">
            </p>
            <p>
                <button @click="login">登录</button>
            </p>
        </div>
        <div class="group" v-show="!flag">
            <p>
                <input type="text" v-model="reg_user" placeholder="请输入账号">
            </p>
            <p>
                <input type="password" v-model="reg_pwd" placeholder="请输入密码">
            </p>
            <p>
                <button @click="reg">注册</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            flag:true,
            reg_user:"",
            reg_pwd:"",
            login_user:"",
            login_pwd:"",
        }
    },
    methods:{
        login(){
            if(!(/^.{6,12}$/.test(this.login_user))){
                this.$alert("用户名输入不正确","请检查后再次输入",{
                    confirmButtonText:"了解"
                })
                return false;
            }
            if(!(/^\w{6,12}$/.test(this.login_pwd))){
                this.$alert("密码输入不正确","请检查后再次输入",{
                    confirmButtonText:"了解"
                })
                return false
            }
            this.$store.commit("loading_show");
            this.$http.get("/api/login",{params:{userName:this.login_user,password:this.login_pwd}}).then((res) => {
            this.$store.commit("loading_hide");
            if(res.data.code){
                this.$store.commit("update_token",res.data.token)
                this.$alert("登录成功",{
                    confirmButtonText:"go",
                    callback:()=>{
                        if(this.$route.query.url){
                            this.$router.push(this.$route.query.url)
                        }else{
                            this.$router.push("/")
                        }
                    }   
                })
            }else{
                this.$alert("用户名或者密码不正确,或不存在","请重试",{
                    confirmButtonText:"了解！"
                })
            }
            }).catch((err) => {
                console.log(err)
            });
        },
        reg(){
            if(!(/^.{6,12}$/.test(this.reg_user))){
                this.$alert("用户名输入不合法,6-12位任意字符","请检查后再次输入",{
                    confirmButtonText:"了解"
                })
                return false;
            }
            if(!(/^\w{6,12}$/.test(this.reg_pwd))){
                this.$alert("密码输入不合法,6-12位任意字符","请检查后再次输入",{
                    confirmButtonText:"了解"
                })
                return false
            }
            this.$store.commit("loading_show");
            this.$http.get("/api/register",{params:{userName:this.reg_user,password:this.reg_pwd}}).then((res) => {
            this.$store.commit("loading_hide");
            if(res.data.code){
                this.$store.commit("update_token",res.data.token)
                this.$alert("注册成功快去登录吧","response",{
                    confirmButtonText:"go",
                    callback:()=>{
                       this.flag=true
                    }   
                })
            }else{
                this.$alert("用户名重复请重试","response",{
                    confirmButtonText:"了解！"
                })
            }
            }).catch((err) => {
                console.log(err)
            });
        }
    }

}
</script>
<style scoped>
.group button{
    width: 300px;
    height: 50px;
    background: red;
    font-size: 16px;
    color: #fff;
    outline: none;
}
.group input{
    width: 500px;
    height: 50px;
    text-indent: .5em;
    border-radius: 25px;
    border: 2px solid #999;
    outline: none;
}
.group input:focus{
    border: 2px solid orange;
}
.group{
    margin-top: 100px;
}
.group p{
    text-align: center;
    margin-top: 20px;
}
.btn .btn_c{
    width: 400px;
    height: 50px;
    float: left;
    line-height: 50px;
    cursor: pointer;
    color: black;
    border: 1px solid black;
}
.btn .con{
    background: #ff5722;
    color: #fff;
}
.btn{
    overflow: hidden;
}
.view{
    width: 804px;
    height: 500px;
    background: #fff;
    margin: 100px auto; 
}
</style>
