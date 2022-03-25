import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'images',
  props: {
    options: {
      type: Object,
      required: true,
      default: () => ({
        data: [{ url: require('@/assets/images/Error.png').default }]
      })
    }
  },
  setup(props) {
    return () => (
      <div class="image">
        {props.options.data.map((item: { url: string }, index: number) => {
          return <van-image width="100%" src={item.url} />
        })}
      </div>
    )
  }
})
