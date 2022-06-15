import Vue from 'vue'
import App from './App.vue'
//引入element ui 组件
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Switch,
  Select,
  Option,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from '@/store';
import '@/assets/less/index.less'
import "@/mock/mockServe"

import * as API from '@/api'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.prototype.$message=Message
Vue.prototype.$confirm = MessageBox.confirm


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API=API

  },
  created(){
    /* 解决刷新白屏问题 */
    store.commit('addMenu',router)
  }
  
}).$mount('#app')
