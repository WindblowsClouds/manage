import { TOKEN ,getTOKEN, removeToken } from '@/utils/token'
const actions={}
const mutations={
    SETTOKEN(state,token){
        state.token=token
        console.log(token);
        TOKEN(token)
    },
    clearToken(){
        state.token=''
        removeToken()
    }
}
const state={
    token:getTOKEN()
}
const getters={}

export default {
    actions,mutations,state,getters
}