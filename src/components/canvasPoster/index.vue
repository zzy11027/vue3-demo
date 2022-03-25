<template>
  <van-button @click="posterSave" size="small">生成海报</van-button>

  <van-button @click="createPoster" size="small">截屏生成</van-button>
  <van-dialog v-model:show="show" title="标题" show-cancel-button>
    <img :src="dataImg" width="300" height="300" />
  </van-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AlloyFinger from 'alloyfinger'

import cax from 'cax'
import html2 from '@/mixins/html2canvas'

export default defineComponent({
  name: 'canvasPoster',
  mixins: [html2],
  data() {
    return {
      alloyDom: null,
      stage: null
    }
  },
  mounted() {
    console.log('初始化', AlloyFinger, cax)
    this.initCax()
  },
  methods: {
    initAlloyFinger(dom: Element, dom1: any) {
      const _this: any = this
      let initScale = 1
      new AlloyFinger(dom, {
        // eslint-disable-next-line
        multipointStart: (e: any) => {
          initScale = dom1.scaleX
        },
        pinch: (e: any) => {
          dom1.scaleX = dom1.scaleY = initScale * e.scale
        },
        rotate: (e: any) => {
          console.log('e:ROTATE :>> ', e)
          dom1.rotation += e.angle
          _this.stage.update()
        },
        pressMove: (e: any) => {
          dom1.x = e.stageX
          dom1.y = e.stageY
          _this.stage.update()
        },
        touchStart: (e: any) => {
          console.log('e :>> ', e)
        }
      })
    },
    initCax() {
      const _this: any = this
      _this.stage = new cax.Stage(375, 200, 'body')
      cax.loadImgs({
        imgs: [
          require('@/assets/images/luckDraw.png').default,
          require('@/assets/logo.png').default
        ],
        complete: (imgs: any) => {
          const img1 = imgs[0]
          const img2 = imgs[1]
          const bitmap1 = new cax.Bitmap(img1)
          const bitmap2 = new cax.Bitmap(img2)

          bitmap1.x = (_this as any).stage.width / 2
          bitmap1.y = _this.stage.height / 2
          bitmap1.rotation = -10
          bitmap1.originX = img1.width / 2
          bitmap1.originY = img1.height / 2
          // bitmap1.filter('blur(10px)')

          bitmap2.x = _this.stage.width / 2
          bitmap2.y = _this.stage.height / 2
          bitmap2.rotation = -10
          bitmap2.originX = img2.width / 2
          bitmap2.originY = img2.height / 2

          _this.stage.add(bitmap1, bitmap2)
          _this.stage.update()

          this.initAlloyFinger(_this.stage.canvas, bitmap2)
          //  cax 自带事件，但是不包括旋转缩放
          // _this.stage.on('touchmove', (e: any) => {
          // 	bitmap2.x = e.stageX
          // 	bitmap2.y = e.stageY
          // 	_this.stage.update()
          // })
        }
      })
    },
    posterSave() {
      const _this: any = this
      const base64 = _this.stage.canvas.toDataURL('image/png', 1)
      console.log('base64 :>> ', base64)
      _this.dataImg = base64
      _this.show = true
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup() {}
})
</script>

<style lang="scss" scoped></style>
