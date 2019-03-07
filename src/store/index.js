import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        token:"",
        loading:false
    },
    mutations:{
        // loading显示
        loading_show(state){
            state.loading=true
        },
        // loading隐藏
        loading_hide(state){
            state.loading=false
        },
        // 更新token,防止页面刷新数据重置token
        update_token(state,a){
            state.token=a;
            localStorage.token=a
        }
    }
})