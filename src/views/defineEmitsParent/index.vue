<template>
  <h1 @click="getRef">defineEmitsParent</h1>
  <defineEmits
    msg="父组件传递props"
    :obj="obj"
    @accept="accept"
    ref="childRef"
  />
</template>

<script lang="ts" setup name="defineEmitsParent">
import { watchEffect, reactive, ref, onMounted } from 'vue'
import defineEmits from '@/views/defineEmits/index.vue'

const obj = reactive({
  name: 'parent',
  value: '父组件传递props'
})

const accept = (e: number[]) => {
  console.log('e :>> ', e)
  alert(e)
}

// 获取子组件实例

const childRef = ref(null)
const getRef = () => {
  console.log('childRef :>> ', childRef)
}
</script>

<style lang="scss" scoped></style>
