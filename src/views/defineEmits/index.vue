<template>
  <h1>defineEmitsChildren</h1>
  <div>{{ msg }}</div>
  <div>{{ obj }}</div>
  <button @click="toEmit">派发</button>
</template>

<script lang="ts" setup name="defineEmitsChildren">
import { reactive, defineProps, defineEmits, defineExpose } from 'vue'

// defineProps({
//   msg: String,
//   obj: {
//     type: Object
//   }
// })

// 或者
type O = {
  msg: string
  obj: Record<string, unknown>
}
const props = defineProps<O>()
console.log('props :>> ', props)

//  事件派发

const list = reactive<number[]>([1, 2, 3])
const emit = defineEmits(['accept'])

const toEmit = () => {
  emit('accept', list)
}

// 向父组件暴露自己的实例上的属性，  如果使用setup语法默认全部锁死不能访问，必须使用defineExpose  ，如果使用的是options api   默认暴露实例全部内容
defineExpose({
  list
})
</script>

<style lang="scss" scoped></style>
