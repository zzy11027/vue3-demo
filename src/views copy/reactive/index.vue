<template>
  <h1>arr:{{ message }}</h1>
  <button @click="changeMsg">change</button>
</template>

<script lang="ts" setup>
import { reactive, readonly, shallowReactive } from 'vue'
// const message = reactive<number[]>([]) // 接受数组  或对象

// setTimeout(() => {
//   const arr = [1, 2, 3, 4]
//   // message = arr  // 这样会破坏message的响应式
//   message.push(...arr)

// }, 1000)

//  或者

// type O = {
//   list: number[]
// }
// const message = reactive<O>({
//   list: []
// })

// setTimeout(() => {
//   message.list = [1, 1]
// }, 1000)

// const person = reactive({
//   count: 1
// })

// const copy = readonly(person)
// copy.count++ // 只读不可以更改

// 浅层响应式
const message = shallowReactive({
  test: 'shallowReactive',
  nav: {
    bar: {
      name: '深层对象'
    }
  }
})

const changeMsg = () => {
  message.test = 'memeda' // 可以改变
  // message.nav.bar.name = '深层对象memeda' // 不会改变   但是如果第一层放生改变后，第二层也会被监听到
  // console.log('message :>> ', message)
}
</script>

<style lang="scss" scoped></style>
