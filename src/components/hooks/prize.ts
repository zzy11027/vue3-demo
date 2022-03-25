import { ComputedRef } from 'vue'
import { Toast, Dialog } from 'vant'

export const ActivityIsStart = (getStart: ComputedRef<any>) => {
  if (getStart.value === false) {
    Toast({
      message: '活动暂未开启',
      icon: 'info'
    })
    return false
  } else {
    return true
  }
}
