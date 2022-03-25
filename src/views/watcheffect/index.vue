<template>
  <input v-model="message" type="text" />
  <input id="inp" v-model="message1" type="text" />

  <button @click="stopWatch">暂停</button>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue'

const message = ref('飞机')
const message1 = ref('飞机杯子')

const stop = watchEffect(
  oninvalidate => {
    const inp = document.querySelector('#inp')
    console.log('inp :>> ', inp)
    oninvalidate(() => {
      console.log('before :>> ')
      //  先执行这里，  可以在里面进行一些处理，例如防抖之类
    })
    console.log('message.value :>> ', message.value)
    console.log('message1.value :>> ', message1.value)
  },
  {
    flush: 'post' //
  }
)

const stopWatch = () => stop() // 停止监听
</script>

<style lang="scss" scoped></style>
