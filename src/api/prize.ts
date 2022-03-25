import { getToken, getCsrfToken } from '@/utils/auth'
import request from '@/utils/request'
export interface Prize {
  activityId: number
  userId: number
}

// 抽奖
export function getPrize(params: Prize) {
  return request<Prize>({
    url: `/activityFront/luckDraw/${params.activityId}/${params.userId}`,
    method: 'post',
    headers: {
      token: getToken()
    }
  })
}

// 获取抽奖次数
export function getPrizeCount(params: Prize) {
  return request<number>({
    url: `/activityFront/getDrawTimes/${params.activityId}/${params.userId}`,
    method: 'get'
  })
}

// 获取中奖记录
export function getPrizeList(params: Prize) {
  return request<Array<any>>({
    url: `/activityFront/list/${params.activityId}`,
    method: 'get'
  })
}
