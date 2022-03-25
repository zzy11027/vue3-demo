import { GetInfoResponse, GetUserToken } from '@/api'

export interface State {
  token: string | undefined
  userInfo: GetInfoResponse
  userToken: GetUserToken
  userId: string
}
