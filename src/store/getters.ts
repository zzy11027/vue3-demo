import { GetterTree } from 'vuex'
import { State as UserState } from './modules/user/types/state-types'
import { State as ActivityState } from './modules/activity/types/state-types'

export interface State {
  user: UserState
  activity: ActivityState
  // ...
}

export type Getters = {
  getUid(state: State): string | undefined
  getToken(state: State): string | undefined
  // ...
}

const getters: GetterTree<State, State> & Getters = {
  getUid: state => state.user.userInfo.uid,
  getToken: state => state.user.token,
  // ...
  getStart: state => state.activity.isStart,
  getActivityId: state => state.activity.activityId,
  getUserId: state => state.user.userId,
  isLogin: state => state.activity.isLogin !== 0 && state.user.token === '',
  prizeCount: state => state.activity.details.frequency
}

export default getters
