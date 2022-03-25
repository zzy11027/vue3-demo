import router from '@/router'
import store from '@/store'
import { Toast, Notify } from 'vant'
import { getToken, blackList } from './auth'

// eslint-disable-next-line
router.beforeEach(async (to: any, from, next) => {
  // 设置标题
  document.title = to.meta.title || 'activityCenter-wap'

  // 根据token判断用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/signin') {
      // 如果已经登录了，而去的又是login页就重定向到首页
      next({ path: '/' })
    } else {
      const hasUserInfo = store.getters.getUid
      if (hasUserInfo) {
        next()
      } else {
        // 如果用户刷新了浏览器，那么需要重新请求基本信息塞到vuex中进行状态管理
        // 中台H5模板客户端，暂时没有授权用户信息接口，暂时屏蔽掉用授权接口,改为本地缓存
        const data = localStorage.getItem('userInfo')
        if (data !== null) {
          const userData = JSON.parse(data)
          store.commit('user/SET_USER_INFO', userData)
          store.commit('user/SET_USER_ID', userData.memberNo)
        }
        next()
        // try {
        //   await store.dispatch('user/GET_INFO')
        //   next()
        // } catch (error) {
        //   // 清空token重新去登录
        //   await store.dispatch('user/SING_OUT')
        //   Toast.fail(error.message || '出错了')
        //   next(`/login?redirect=${encodeURI(location.href)}`)
        // }
      }
    }
  } else {
    if ((blackList as any).indexOf(to.path) === -1) {
      // 白名单没有token也直接放行
      next()
    } else {
      Notify({ type: 'primary', message: '请先登录后再操作' })
      next(`/signin?redirect=${to.fullPath}`)
    }
  }
})
