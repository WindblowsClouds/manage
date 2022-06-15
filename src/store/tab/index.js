
const actions={}
const mutations={
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    setMenu(state,val){
        state.menu=val
        sessionStorage.setItem('menu',JSON.stringify(val))
    },
    clearMenu(state){
        state.menu=[]
        sessionStorage.removeItem('menu')
    },
    addMenu(state,router){
        if(!sessionStorage.getItem('menu')){
            return
        }
        const menu=JSON.parse(sessionStorage.getItem('menu'))
        state.menu=menu
        
        const menuArray=[]
        menu.forEach(item => {
            if(item.children){
                item.children=item.children.map(item=>{
                    item.component=()=>import(`@/veiws/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            }else{
                item.component=()=>import(`@/veiws/${item.url}`)
                menuArray.push(item)
            }
            
        });
        //动态添加路由处理
        menuArray.forEach(item=>{
            router.addRoute('Main',item)
        })
    }
}
const state={
    isCollapse:false,
    menu:[]
}
const getters={}

export default {
    actions,mutations,state,getters
}