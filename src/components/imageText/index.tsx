import { defineComponent } from 'vue'

export default defineComponent({
  name: 'imageText',
  setup() {
    return () => (
      <div class="imageText">
        我是图文混排组件我是图文混排组件我是图文混排组件 我是图文混排组件
        我是图文混排组件 我是图文混排组件我是图文混排组件
        我是图文混排组件我是图文混排组件
      </div>
    )
  }
})
