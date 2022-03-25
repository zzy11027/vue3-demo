<template>
  <!-- <imageText /> -->
  <!-- <LuckyWheel /> -->
  <!-- <LuckyGrid />
	<swiper />
	<canvasPoster /> -->
  <div v-if="content.length !== 0" test="test">
    <template v-for="(value, index) in content" :key="value.type">
      <component
        :is="value.type"
        :options="value"
        :data="value.data"
        :ref="el => (domList[index] = el)"
      ></component>
    </template>
    <Login />
    <!-- 后端未配置是否登录 -->
    <!-- <Login v-if="isLogin.value" /> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, computed, nextTick } from 'vue'
import { Toast } from 'vant'
import { getActivityDetails, addBower } from '@/api/activity'
import Login from '@/components/login/login.vue'
import { mapGetters, useStore } from 'vuex'
import { useRoute } from 'vue-router'
import wxShare from '@/utils/wxShare'

const content: Ref<Array<{ type: any; data: any }>> = ref([])
const store = useStore()
const activityId = computed(
  mapGetters(['getActivityId']).getActivityId.bind({ $store: store })
)
const userId = computed(
  mapGetters(['getUserId']).getUserId.bind({ $store: store })
)
const isLogin = computed(
  mapGetters(['isLogin']).isLogin.bind({ $store: store })
)
const getDetails = () => {
  store
    .dispatch('activity/GET_ACTIVITY_DETAILS', activityId.value)
    .then(res => {
      console.log('活动详情1 :>> ', res)
      const temJson = JSON.parse((res.data as any).contentJson)
      if (temJson.length <= 1) {
        Toast(`请求异常`)
      } else {
        temJson.splice(0, 1)
        content.value = temJson
        const shareTitle = res.shareTitle
        const shareContent = res.shareContent
        const shareImg = res.shareImg
        const link = location.href
        // wxShare.wxShowMenu({ shareTitle, shareContent, shareImg, link })
      }
    })
}

const updateBower = async () => {
  const { data } = await addBower({
    activityId: activityId.value,
    userId: userId.value
  })
}

const getParams = () => {
  const route = useRoute()
  const activityId = Number(route.query.activityId) || 30
  // const userId = Number(route.query.userId) || 2
  // if (isNaN(activityId) || isNaN(userId)) {
  if (isNaN(activityId)) {
    Toast.fail(`参数错误`)
    return
  }
  // store.dispatch('activity/CHECK_TIME', { activityId, userId }).then(res => {
  store.dispatch('activity/CHECK_TIME', { activityId }).then(res => {
    console.log(
      '异步设置活动ID成功，并且检验活动是否开始，可以进行后续接口调用 :>> ',
      1
    )
    getDetails() // 获取活动详情用以渲染H5
    // updateBower() // 更新日均活跃人数
  })
}
const domList: Ref<any[]> = ref([])

onMounted(() => {
  getParams() // 获取URL 参数   登录后屏蔽
})

// 将ref暴露给外部组件
// defineExpose({
//   domList
// })
</script>

<style lang="scss" scoped>
.home {
  background: #f5f5f5;
  min-height: 100vh;
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #fff;
  }
}
</style>
