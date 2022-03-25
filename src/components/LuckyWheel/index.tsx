import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
  onMounted,
  getCurrentInstance
} from 'vue'
import { mapGetters, useStore } from 'vuex'
import { Toast } from 'vant'
import { LuckyWheel, LuckyGrid } from 'vue-luck-draw/vue3'
import luckPop from '../luckPop/luckPop.vue'
import record from '../luckPop/record.vue'
import { getPrize, getPrizeCount, getPrizeList } from '@/api/prize'
import { ActivityIsStart } from '../hooks/prize'
import calculationPrizeCount from '@/hook/prize'
import './index.scss'

export interface Options {
  isTimes?: string
  isRecord: string
}

export default defineComponent({
  name: 'turntable',
  components: { LuckyWheel, LuckyGrid, luckPop, record },
  props: {
    options: {
      type: Object as PropType<Options>,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, { expose }) {
    const internalInstance: any = getCurrentInstance()
    const emitter = internalInstance.appContext.config.globalProperties.emitter // 用以候去全局方法，并在登录后调用抽奖组件中的次数统计
    const showPop = ref(false)
    const prizeArr = (props as any).options.turnArr
    const prizes: Record<string, unknown>[] = reactive([]) // 奖项配置
    const isLuck = ref(false) // 是否中奖
    let LuckPrize = reactive({}) // 中奖项
    const show = ref(false) // 是否显示中奖记录弹窗
    const count = ref() // 中奖次数
    const list = ref([
      {
        name: '奖品1',
        time: '时间1'
      },
      {
        name: '奖品2',
        time: '时间2'
      }
    ])
    prizeArr.forEach((item: any, index: number) => {
      const obj: {
        fonts?: Record<string, unknown>[]
        imgs?: Record<string, unknown>[]
        background?: string
      } = {}
      obj.fonts = [{ text: item.prizeName, top: '10%' }]
      obj.background = index % 2 ? '#f9e3bb' : '#f8d384'
      try {
        obj.imgs = [{ src: item.imgsInfo.url, width: '15%', top: '35%' }]
      } catch (error) {
        // console.log('error :>> ', error)
        obj.imgs = [
          {
            src: require('@/assets/images/Error.png').default,
            width: '15%',
            top: '35%'
          }
        ]
      }
      prizes.push(obj)
    })
    const blocks = reactive([{ padding: '13px', background: '#d64737' }])
    const buttons = reactive([
      { radius: '50px', background: '#d64737' },
      { radius: '45px', background: '#fff' },
      { radius: '41px', background: '#f6c66f', pointer: true },
      {
        radius: '35px',
        background: '#ffdea0',
        imgs: [
          {
            src: require('@/assets/images/buttons.png').default,
            width: '65%',
            top: '-50%'
          }
        ]
      }
    ])

    const luckDom: any = ref(null)
    const startCallBack = async () => {
      if (!userId.value) {
        Toast(`请先登录`)
        return
      }
      if (!ActivityIsStart(getStart)) return
      try {
        const data: any = await getPrize({
          activityId: activityId.value,
          userId: userId.value
        })
        console.log('data :>> ', data)
        const result = data.data
        luckDom.value.play()
        setTimeout(() => {
          luckDom.value.stop(result.turnIndex) // 此处根据接口可能还需要判断数组中奖项索引值
          isLuck.value = result.isPrize
          LuckPrize = result
          calculationPrizeCount().then(res => {
            count.value = res.frequency
          })
          getList()
        }, 1000)
      } catch (error) {
        // console.log('error :>> ', error)
        Toast(error)
      }
    }

    const endCallBack = (prize: { fonts: { text?: string }[] }) => {
      console.log('prize :>> ', prize.fonts[0].text)
      showPop.value = true
    }

    // 父子自定义事件
    const change = (param: boolean) => {
      console.log('param :>> ', param)
      // isLuck.value = param
      showPop.value = param
    }

    // 中奖次数
    const isTimes = computed(() => {
      return props.options.isTimes
    })

    // 中将记录
    const isRecord = computed(() => {
      return props.options.isRecord
    })

    // 中奖记录弹窗
    const showRecord = () => {
      if (!ActivityIsStart(getStart)) return
      show.value = !show.value
    }

    // 隐藏记录弹窗
    const IsShow = () => {
      show.value = false
    }

    // 接受登录组件参数
    emitter.on('setPrizeCount', (news: number) => {
      calculationPrizeCount().then(res => {
        count.value = res.frequency
      })
    })

    onMounted(() => {
      if (userId.value !== '') {
        // 首次初始化组件，计算次数
        calculationPrizeCount().then(res => {
          count.value = res.frequency
        })
      }
      getList() // 中奖列表
    })

    // 获取中奖列表
    const getList = async () => {
      const { data } = await getPrizeList({
        activityId: activityId.value,
        userId: userId.value
      })
      list.value = data
    }

    // 获取全局状态  判断活动是否开始
    const getStart = computed(
      mapGetters(['getStart']).getStart.bind({ $store: useStore() })
    )

    const activityId = computed(
      mapGetters(['getActivityId']).getActivityId.bind({
        $store: useStore()
      })
    )

    const userId = computed(
      mapGetters(['getUserId']).getUserId.bind({ $store: useStore() })
    )

    // 获取全局状态  总次数
    const AllPrizeCount = computed(
      mapGetters(['prizeCount']).prizeCount.bind({ $store: useStore() })
    )

    // 将获取中将次数方法暴露给外部
    expose({
      count
    })
    return () => (
      <div
        class="background"
        style={
          props.data.length === 0
            ? ''
            : {
                background: `url(${props.data[0].url}) no-repeat`,
                backgroundSize: 'cover'
              }
        }
      >
        <LuckyWheel
          class="luckyWheel"
          ref={luckDom}
          width="300px"
          height="300px"
          prizes={prizes}
          blocks={blocks}
          buttons={buttons}
          onStart={startCallBack}
          onEnd={endCallBack}
        />
        <h3 class="prizeCount">
          {isTimes.value === 'a' && userId.value !== '' ? (
            <div>
              <span>我的抽奖次数:</span>
              <span>
                <b>{count.value}</b>次
              </span>
            </div>
          ) : (
            ''
          )}
          {isRecord.value === 'record' ? (
            <div class="record" onClick={showRecord}>
              <span>中奖记录</span>
            </div>
          ) : (
            ''
          )}
        </h3>
        {showPop.value ? (
          <luckPop
            isLuck={isLuck.value}
            prize={LuckPrize}
            onChangeLuck={change}
          />
        ) : (
          ''
        )}
        <record show={show.value} list={list.value} onIsshow={IsShow} />
      </div>
    )
  }
})
