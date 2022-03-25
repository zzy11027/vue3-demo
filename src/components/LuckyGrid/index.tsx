import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  PropType,
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
  name: 'Grid',
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
    const isLuck = ref(false) // 是否中奖
    let LuckPrize = reactive({}) // 中奖信息数据流
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
    const prizes: any = ref<Array<any>>([])
    const prizeArr = (props as any).options.turnArr
    // const prizeName: string[] = []
    // prizeArr.map((item: { prizeName: string }) => {
    //   prizeName.push(item.prizeName)
    // })
    const axis = [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [1, 2],
      [0, 2],
      [0, 1]
    ]
    prizeArr.forEach((item: any, index: number) => {
      try {
        const obj = {
          title: item.prizeName,
          x: axis[index][0],
          y: axis[index][1],
          imgs: [
            {
              width: '100%',
              src: item.imgsInfo.url,
              activeSrc: item.imgsInfo.activeSrc
            }
          ]
        }
        prizes.value.push(obj)
      } catch (error) {
        // console.log('error :>> ', error)
        const obj = {
          title: item.prizeName,
          x: axis[index][0],
          y: axis[index][1],
          imgs: [
            {
              width: '100%',
              src: require('@/assets/images/Error.png').default
            }
          ]
        }
        prizes.value.push(obj)
      }
    })
    const blocks = [
      { padding: '1px', background: '#e2cea3', borderRadius: '13px' },
      { padding: '5px 0px', background: '#f3ecdc', borderRadius: '13px' },
      { padding: '1px', background: '#e2cea3', borderRadius: '8px' },
      { padding: '15px 10px', background: '#fffcf5', borderRadius: '8px' }
    ]
    const buttons = [
      {
        x: 1,
        y: 1,
        background: 'rgba(0, 0, 0, 0)',
        imgs: [
          {
            src: require('@/assets/images/btn.png').default,
            width: '90%',
            top: '5%'
          }
        ]
      }
    ]
    const defaultConfig = {
      gutter: 5
    }
    const defaultStyle = {
      background: '#ffefd6',
      borderRadius: '5px',
      fontColor: '#755c28',
      fontSize: '10px',
      lineHeight: '12px'
    }
    const activeStyle = {
      background: '#de7247',
      fontColor: '#ffefd6'
    }
    let refs: any
    const luckDom = (el: HTMLElement) => {
      refs = el
    }

    // 显示中奖次数？
    const isTimes = computed(() => {
      return props.options.isTimes
    })

    // 显示中将记录?
    const isRecord = computed(() => {
      return props.options.isRecord
    })

    // 获取全局状态  判断活动是否开始
    const getStart = computed(
      mapGetters(['getStart']).getStart.bind({ $store: useStore() })
    )

    const activityId = computed(
      mapGetters(['getActivityId']).getActivityId.bind({ $store: useStore() })
    )

    const userId = computed(
      mapGetters(['getUserId']).getUserId.bind({ $store: useStore() })
    )

    // 获取全局状态  总次数
    const AllPrizeCount = computed(
      mapGetters(['prizeCount']).prizeCount.bind({ $store: useStore() })
    )

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
        refs.play()
        setTimeout(() => {
          refs.stop(result.turnIndex) // 此处根据接口可能还需要判断数组中奖项索引值
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

    const endCallBack = (prize: Record<string, unknown>) => {
      console.log('prize :>> ', prize)
      showPop.value = true
    }

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

    // 中奖记录弹窗
    const showRecord = () => {
      if (!ActivityIsStart(getStart)) return
      show.value = !show.value
    }

    // 父子自定义事件
    const change = (param: boolean) => {
      console.log('param :>> ', param)
      // isLuck.value = param
      showPop.value = param
    }

    // 接受登录组件参数
    emitter.on('setPrizeCount', (news: number) => {
      calculationPrizeCount().then(res => {
        count.value = res.frequency
      })
    })

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
        <LuckyGrid
          class="luckyGrid"
          ref={luckDom}
          width="300px"
          height="300px"
          blocks={blocks}
          prizes={prizes.value}
          buttons={buttons}
          defaultConfig={defaultConfig}
          default-style={defaultStyle}
          active-style={activeStyle}
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
        <record show={show.value} list={list.value} onIsshow={showRecord} />
      </div>
    )
  }
})
