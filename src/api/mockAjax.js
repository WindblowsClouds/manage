//对axios进行二次封装
//引入axios
import axios from "axios";

const requests=axios.create({
    //请求基础路径
    baseURL:"/mock",
    //请求超时时间
    timeout:5000
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data
},(err)=>{
    console.log(err.message);
    return Promise.reject(new Error('faile'))
    
})
export default requests

