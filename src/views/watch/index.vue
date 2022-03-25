<template>
  <h1>watch</h1>
  <input v-model="inputVal1" type="text" />
  <input v-model="inputVal2" type="text" />
  <input v-model="inputVal3.bar.barC" type="text" />
  <input v-model="inputVal3.name" type="text" />
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue'
const inputVal1 = ref('watch')
const inputVal2 = ref('watch')
// const inputVal3 = ref({
//   name: 'input',
//   bar: {
//     barC: 123
//   }
// })

const inputVal3 = reactive({
  name: 'input',
  bar: {
    barC: 123
  }
})

// watch([inputVal1, inputVal2], (n, v) => {
//   console.log('n,v :>> ', n, v)
// })

// watch(
//   inputVal3,
//   (n, v) => {
//     console.log('n,v :>> ', n, v)
//   }
//   // { deep: true, immediate: true } //  如果inputVal3  使用reactive包裹，可以不用  deep
// )

watch(
  () => inputVal3.name, // 只监听对象里的一个key可以通过函数的写法
  (n, v) => {
    console.log('n,v :>> ', n, v)
  }
)
</script>

<style lang="scss" scoped></style>
