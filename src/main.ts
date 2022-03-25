import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons/index'
import './styles/index.scss'

import './utils/auth'
import './utils/permission'
import emitter from './utils/emitter'
// import '@/utils/hmt'

import vant from '@/components/Vant'
// import vconsole from '@/plugins/vconsole'
import components from '@/components'

// eslint-disable-next-line
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app
  .use(store)
  .use(router)
  .use(vant)
  .use(components)
  // .use(vconsole)
  .mount('#app')
