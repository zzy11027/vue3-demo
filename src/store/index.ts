import { createStore } from 'vuex'
import user from './modules/user/index'
import activity from './modules/activity/index'
import getters from './getters'

export default createStore({
  modules: { user, activity },
  getters
})
