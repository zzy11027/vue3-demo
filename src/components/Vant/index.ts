import { App } from 'vue'
import {
  Button,
  List,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Form,
  Field,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Overlay,
  Area,
  Popup,
  Toast
} from 'vant'

// https://vant-contrib.gitee.io/vant/v3/#/zh-CN
const plugins = [
  Button,
  List,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  VanImage,
  PullRefresh,
  Form,
  Field,
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Grid,
  GridItem,
  Overlay,
  Area,
  Popup,
  Toast
]

export default {
  install(vm: App) {
    plugins.forEach(item => {
      item.name === 'van-overlay' ||
      item.name === 'van-area' ||
      item.name === 'van-toast'
        ? vm.use(item)
        : vm.component(item.name, item)
    })
  }
}
