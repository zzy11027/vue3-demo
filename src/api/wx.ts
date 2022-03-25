import request from '@/utils/request'
export type GetInfoResponse = {
  url?: string
}
export function getWxInfo(params: GetInfoResponse) {
  return request<GetInfoResponse>({
    url: '/user/info',
    method: 'get',
    params
  })
}
