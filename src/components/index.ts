import { App } from 'vue'

import imageText from '@/components/imageText'
import swiper from '@/components/swiper'
import LuckyWheel from '@/components/LuckyWheel'
import LuckyGrid from '@/components/LuckyGrid'
import canvasPoster from '@/components/canvasPoster/index.vue'
import images from '@/components/image/index'
import texts from '@/components/texts/index'

const components: Record<string, unknown>[] = [
  imageText,
  swiper,
  LuckyWheel,
  LuckyGrid,
  canvasPoster,
  images,
  texts
]

export default {
  install: function (vm: App) {
    components.forEach(item => {
      vm.component((<any>item).name, item)
    })
  }
}
