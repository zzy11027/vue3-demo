<template>
  <div>
    <button @click="changeMsg">change</button>
    <div>{{ message }}</div>
    <div>{{ shalow }}</div>
    <div>{{ cusRef }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, isRef, shallowRef, triggerRef, customRef } from 'vue'
const message: Ref<string> = ref('测试ref')
// const message = ref<string>('测试ref')

const shalow = shallowRef({
  name: '鸣人'
})

const noeRef = 1 // 测试是否为ref响应式数据

const changeMsg = () => {
  // console.log(message.value)
  // message.value = '改变了'
  // console.log('isRef(noeRef) :>> ', isRef(noeRef))
  // console.log('isRef(message) :>> ', isRef(message))
  // shalow.value.name = '火影' // 不可以改变
  // shalow.value = { name: '火影' } // 可以改变  shallowRef 只有value是响应式的
  // 或者  使用 triggerRef强制更新dom
  // shalow.value.name = '火影'
  // triggerRef(shalow)

  cusRef.value = '21'
}

function MyRef<T>(value: T) {
  return customRef((trank, trigger) => {
    return {
      get() {
        trank()
        return value
      },
      set(newVal: T) {
        console.log('set :>> ')
        value = newVal
        trigger()
      }
    }
  })
}

const cusRef = MyRef<string>('测试custom')
</script>

<style lang="scss" scoped></style>
