import Vue from "vue";
import Vuex from 'vuex'
import tab from '@/store/tab'
import home from "./home";
import login from "./login";
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,home,login
    }
})