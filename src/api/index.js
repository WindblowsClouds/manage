import mockrequests from "./mockAjax";

export const reqtableInfo=()=>mockrequests.post("/table")
export const reqdataInfo=()=>mockrequests.post("/data")
export const reqUpdateUser=(data)=>mockrequests.post("/user/edit",data)
export const reqCreateUser=(data)=>mockrequests.post("/user/add",data)
//接受一个param参数
export const reqUserList=(params)=>mockrequests.get("/user/getUser",{params})

export const reqDelectUser=(data)=>mockrequests.post("/user/del",data)

export const reqMenu=(params)=>mockrequests({url:'/permission/getMenu',data:params,method:'post'})