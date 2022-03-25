import { State } from './state-types'
import { GetInfoResponse, GetUserToken } from '@/api'

export enum Mutation {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER_INFO = 'SET_USER_INFO',
  SING_OUT = 'SING_OUT',
  SET_LOCAL_INFO = 'SET_LOCAL_INFO',
  SET_USER_ID = 'SET_USER_ID'
}

export type Mutations<S = State> = {
  [Mutation.SET_TOKEN](state: S, token: GetUserToken): void
  [Mutation.SING_OUT](state: S, token: string): void
  [Mutation.SET_USER_INFO](state: S, info: GetInfoResponse): void
}
