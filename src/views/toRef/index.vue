<template>
  <h1>
    toRef和toRefs就相当于一个是单数一个是复数，将传递过来的参数解构解构解构，解构出来的每一个变量都变成了ref响应式数据<br />
    普通结构 const { foo, bar } = obj foo，bar，并不是响应式
  </h1>
  <!-- <h1>bar:{{ message }}</h1> -->
  <!-- <h1>foo:{{ foo }}bar:{{ bar }}</h1>
  <button @click="changeMsg">change</button> -->

  <div>{{ raw }}</div>
</template>

<script lang="ts" setup>
import { toRef, toRefs, reactive, toRaw } from 'vue'
// const obj = {
//   foo: 1,
//   bar: 2
// }

// // toRef 会改变原始数据，也会改变响应式数据，但是不会修改UI界面  (如果原始数据 obj  是 用reactive 包裹的，那么UI也会发生改变)
// const message = toRef(obj, 'bar')
// const changeMsg = () => {
//   message.value++
//   console.log('-------->原始数据', obj)
//   console.log('-------->引用数据', message)
// }

// const obj = reactive({
//   foo: 1,
//   bar: 2
// })

// const { foo, bar } = toRefs(obj)
// const changeMsg = () => {
//   console.log('foo,bar :>> ', foo, bar)
//   console.log('obj :>> ', obj)
//   foo.value++
// }

// ref和toRef区别:
// ref->复制, 修改响应式数据不会影响原始数据
// toRef->引用, 修改响应式数据会影响原始数据
// ref->数据发生改变, 界面就会自动更新
// toRef->数据发生改变, 界面也不会自动更新

// toRef应用场景:
// 如果想让响应式数据和以前的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用toRef

const obj = reactive({
  foo: 1,
  bar: 2
})

const raw = toRaw(obj)
console.log('响应式数据obj :>> ', obj)
console.log('非响应式数据obj :>> ', raw)
</script>

<style lang="scss" scoped></style>
