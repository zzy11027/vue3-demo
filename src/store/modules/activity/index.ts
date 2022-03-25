import { Toast } from 'vant'
import { MutationTree, ActionTree } from 'vuex'
import { isStart, getActivityDetails } from '@/api/activity'

import { State } from './types/state-types'

export const state: State = {
  isStart: false, // 活动是否开始
  activityId: 0, // 活动ID
  userId: 0, // 用户ID
  isLogin: false, // 是否需要登录
  details: {} // 活动详情
}

const mutations: MutationTree<State> = {
  IS_START(state, start) {
    state.isStart = start
  },
  ACTIVITY_ID(state, id: number) {
    state.activityId = id
  },
  // USER_ID(state, id: number) {
  //   state.userId = id
  // },
  IS_LOGIN(state, login) {
    state.isLogin = login
  },
  SET_ACTIVITY_DETAILS(state, details) {
    state.details = details
  }
}

const actions: ActionTree<State, State> = {
  // 获取活动ID
  async SET_ACTIVITY_ID({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('ACTIVITY_ID', payload.activityId)
        // commit('USER_ID', payload.userId)
        resolve(1)
      }, 0)
    })
  },
  // 检验活动是否开始
  async CHECK_TIME({ dispatch, commit, state }, payload) {
    await dispatch('SET_ACTIVITY_ID', payload)
    const { data } = await isStart(state.activityId)
    if (data === true) {
      commit('IS_START', data)
      console.log('活动已经开始了 :>> ', data)
    } else {
      Toast({
        message: '活动暂未开启',
        icon: 'info'
      })
    }
  },
  // 获取活动详情
  async GET_ACTIVITY_DETAILS({ commit }, payload) {
    return new Promise((resolve, reject) => {
      getActivityDetails(payload).then((res: any) => {
        const isLogin = res.data.requireLogin
        commit('IS_LOGIN', isLogin)
        commit('SET_ACTIVITY_DETAILS', res.data)
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
