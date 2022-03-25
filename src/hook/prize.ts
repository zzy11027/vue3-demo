import { ref, computed } from 'vue'
import { getPrizeCount } from '@/api/prize'
import store from '@/store/index'
import { mapGetters } from 'vuex'

// 获取全局状态   活动ID
const activityId = computed(
  mapGetters(['getActivityId']).getActivityId.bind({
    $store: store
  })
)
// 获取全局状态 用户ID
const userId = computed(
  mapGetters(['getUserId']).getUserId.bind({ $store: store })
)

// 获取全局状态  总次数
const AllPrizeCount = computed(
  mapGetters(['prizeCount']).prizeCount.bind({ $store: store })
)

// 计算剩余次数
const calculationPrizeCount = async () => {
  const { data } = await getPrizeCount({
    activityId: activityId.value,
    userId: userId.value
  })
  const frequency = AllPrizeCount.value - data
  return { frequency, activityId, userId, AllPrizeCount }
}

export default calculationPrizeCount
