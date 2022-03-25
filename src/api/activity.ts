import request from '@/utils/request'
export interface Activity {
  [PronName: string]: any
}
// 获取活动详情
export function getActivityDetails(params: number) {
  return request<Activity>({
    url: `/activityFront/get/${params}`,
    method: 'get'
  })
}

// 检验时间是否开始
export function isStart(params: number) {
  return request({
    url: `/activityFront/checkTime/${params}`,
    method: 'get'
  })
}

// 更新分享次数
export function shartCount(params: { activityId: number; userId: number }) {
  return request({
    url: `/activityFront/addShare/${params.activityId}/${params.userId}`,
    method: 'get'
  })
}

// 更新日均活跃人数
export function addBower(params: { activityId: number; userId: number }) {
  return request({
    url: `/activityFront/addBrowse/${params.activityId}/${params.userId}`,
    method: 'get'
  })
}
