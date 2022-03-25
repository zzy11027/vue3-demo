import { MutationTree, ActionTree } from 'vuex'
import { login, getInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { State } from './types/state-types'
import { Mutations, Mutation } from './types/mutation-types'
import { Actions, Action } from './types/action-types'

export const state: State = {
  token: getToken(),
  userId: '',
  userInfo: {},
  userToken: {}
}

const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_TOKEN](state, UserToken) {
    state.userToken = UserToken
    state.token = UserToken.ticketValue
  },
  [Mutation.SET_USER_ID](state, userId) {
    state.userId = userId
  },
  [Mutation.SING_OUT](state, token) {
    state.token = token
  },
  [Mutation.SET_USER_INFO](state, info) {
    state.userInfo = info
  },
  [Mutation.SET_LOCAL_INFO](state, info) {
    localStorage.setItem('userInfo', JSON.stringify(info))
  }
}

const actions: ActionTree<State, State> & Actions = {
  // 登录
  [Action.SING_IN]({ commit }, payload) {
    return new Promise((resolve, reject) => {
      login(payload)
        .then((res: { data: any }) => {
          const userData = res.data
          commit(Mutation.SET_TOKEN, userData.ticketEntry)
          commit(Mutation.SET_USER_ID, userData.user.memberNo)
          commit(Mutation.SET_USER_INFO, userData.user)
          commit(Mutation.SET_LOCAL_INFO, userData.user)
          setToken(userData.ticketEntry.ticketValue)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 登出
  [Action.SING_OUT]({ commit }) {
    return new Promise(resolve => {
      commit(Mutation.SET_TOKEN, '')
      removeToken()
      resolve()
    })
  },
  // 获取基本用户信息
  [Action.GET_INFO]({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          const data = res.data
          commit(Mutation.SET_USER_INFO, data)
          resolve(data)
        })
        .catch(err => {
          reject(err)
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
