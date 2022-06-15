export const TOKEN=(token)=>{
    return localStorage.setItem('TOKEN',token)
}
export const getTOKEN=()=>{
    return localStorage.getItem('TOKEN')
}
//清除本地token
export const removeToken=()=>{
    return localStorage.removeItem('TOKEN')
}