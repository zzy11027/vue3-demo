import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'banner',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      // console.log('props :>> ', props.options.data)
    })
    return () => (
      <van-swipe autoplay={3000} indicator-color="white" lazy-render>
        {props.options.data.map((item: { url: string }, idx: number) => {
          return (
            <van-swipe-item key={idx}>
              <van-image width="100%" src={item.url} />
            </van-swipe-item>
          )
        })}
      </van-swipe>
    )
  }
})
