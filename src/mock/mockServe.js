//导入mock模块
import Mock from "mockjs";
//json文件不需要对外暴露即可导入
import data from './data.json'
import table from './table.json'
import userApi from './user'
import permission from "./permission";

Mock.mock("/mock/data",{code:200,data:data})

Mock.mock("/mock/table",{code:200,data:table})

Mock.mock(/user\/add/,'post',userApi.createUser)

Mock.mock(/user\/edit/,'post',userApi.updateUser)
//用于生成当前用户数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)
Mock.mock(/user\/del/,'post',userApi.deleteUser)

//拦截
Mock.mock(/permission\/getMenu/,'post',permission.getMenu)

