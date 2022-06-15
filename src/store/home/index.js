import { reqtableInfo ,reqdataInfo} from "@/api"
const actions={
    async gettableInfo({commit}){
       let result=await reqtableInfo()
       console.log(result);
       if(result.code==200){
           commit("GETTABLEINFO",result.data)
       }
    },
    async getdataInfo({commit}){
       let result=await reqdataInfo()
       if(result.code){
           commit("GETDATAINFO",result.data)
       }
    }
}
const mutations={
    GETTABLEINFO(state,tableData){
        state.tableData=tableData
    },
    GETDATAINFO(state,dataData){
        state.dataData=dataData
    }

}
const state={
    tableData:[],
    dataData:{}
}
const getters={
    orderData(state){
        return state.dataData.orderData||{}
    },
    userData(state){
        return state.dataData.userData||[]
    },
    videoData(state){
        return state.dataData.videoData||[]
    }
}
export default {
    actions,mutations,state,getters
}