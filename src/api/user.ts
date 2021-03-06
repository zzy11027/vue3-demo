import request from '@/utils/request'

export type SignupRequest = {
  username: string
  password: string
  confirmPassword: string
  captcha: string
}
export type SigninRequest = {
  username: string
  password: string
}
export type SigninResponse = string
export type GetInfoResponse = {
  uid?: string
  username?: string
  password?: string
  nickname?: string
  avatar?: string
}
export type GetUserToken = {
  ticketName?: string
  ticketValue?: string
}
export type loginParams = {
  isEncry: string
  password: string
  username: string
}

export function signup(data: SignupRequest) {
  return request({
    url: '/user/signup',
    method: 'post',
    data
  })
}

export function signin(data: SigninRequest) {
  return request<SigninResponse>({
    url: '/user/signin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request<GetInfoResponse>({
    url: '/user/info',
    method: 'get'
  })
}

export function login(data: loginParams) {
  return request({
    url: '/activityFront/login',
    method: 'post',
    data
  })
}
