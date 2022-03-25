<template lang="html">
  <teleport to="body">
    <van-overlay :show="true" :lock-scroll="true" class="luckContainer">
      <!-- 未中奖 -->
      <div class="luckPop" v-if="isLuck === 0">
        <div class="luckPopImg">
          <van-image
            width="100%"
            :src="require('@/assets/images/sad.png').default"
          />
        </div>
        <h1>很遗憾没有中奖</h1>
        <button @click="onLogin">确定</button>
      </div>
      <!-- 中奖  虚拟产品弹窗 -->
      <div class="luckPop luckHeight" v-if="isLuck === 1">
        <div class="luckPopImg">
          <van-image
            width="100%"
            :src="require('@/assets/images/happy.png').default"
          />
        </div>
        <h1>恭喜您抽中{{ '    ' + prize.prizeName }}</h1>
        <span> 奖品将在15分钟内发送到您的账户，<br />请注意查收！ </span>
        <button @click="onLogin">确定</button>
      </div>
      <!-- 中奖  实物产品弹窗 -->
      <div class="luckPopEntity" v-if="isLuck === 2">
        <div class="luckPopImg">
          <van-image
            width="100%"
            :src="require('@/assets/images/happy.png').default"
          />
        </div>
        <h1>恭喜您抽中{{ '    ' + prize.prizeName }}</h1>
        <span> 奖品将通过快递方式送达，请确认收货地址 </span>
        <div class="form">
          <van-form @submit="onLogin">
            <van-cell-group inset>
              <van-field
                v-model="result"
                is-link
                readonly
                name="area"
                placeholder="点击选择省市区"
                :rules="[{ required: true, message: '请输入详细地址' }]"
                @click="showArea = true"
              />
              <van-popup
                v-model:show="showArea"
                position="bottom"
                teleport="body"
              >
                <van-area
                  :area-list="areaList"
                  @confirm="onConfirm"
                  @cancel="showArea = false"
                />
              </van-popup>
              <van-field
                v-model="formData.address"
                type="text"
                name="address"
                placeholder="请输入详细地址"
                :rules="[{ required: true, message: '请输入详细地址' }]"
              />
              <van-field
                v-model="formData.username"
                type="number"
                name="userName"
                placeholder="请输入收件人姓名"
                :rules="[{ required: true, message: '请输入收件人姓名' }]"
              />
              <van-field
                v-model="formData.userphone"
                type="number"
                name="userphone"
                placeholder="请输入收件人电话"
                :rules="[{ required: true, message: '请输入收件人电话' }]"
              />
            </van-cell-group>
            <div class="tj">
              <van-button
                round
                block
                type="primary"
                color="#409EFF"
                native-type="submit"
              >
                确认
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </teleport>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
/* eslint-disable */
const isPrize = defineProps({
  isLuck: Number,
  prize: {
    type: Object,
    required: true
  }
})
// 同步中奖项文字  (endCallBack事件返回的数据，更改为直接通过props获取接口数据,因此暂时弃用)
const prizeName = computed(() => {
  if (Object.hasOwnProperty.call(isPrize.prize, 'title')) {
    return isPrize.prize.title
  } else {
    return isPrize.prize.fonts[0].text
  }
})
const emit = defineEmits(['change-luck'])
// 省市联动
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区'
    // ....
  }
}
const result = ref('')
const showArea = ref(false)
const onConfirm = (value: any) => {
  showArea.value = false
  result.value = value
    .filter((item: any) => !!item)
    .map((item: any) => item.name)
    .join('/')
}
onMounted(() => {
  console.log(isPrize)
})
const formData = reactive({
  address: '',
  username: '',
  userphone: ''
})
const onLogin = (values: any) => {
  setTimeout(() => {
    emit('change-luck', false)
  }, 500)
}
</script>
<style lang="scss" scoped>
.luckContainer {
  .luckHeight {
    height: 440px !important;
  }
  .luckPop {
    width: 658px;
    height: 384px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    text-align: center;
  }
  .luckPopEntity {
    width: 658px;
    min-height: 780px;
    position: relative;
    margin: auto;
    top: 20%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    padding-bottom: 20px;
    text-align: center;
    .form {
      margin-top: 22px;
    }
  }
  .luckPopImg {
    width: 64px;
    height: 64px;
    margin: 0 auto;
    margin-top: 60px;
  }
  h1 {
    margin-top: 32px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }
  span {
    color: rgba(0, 0, 0, 0.85);
    font-size: 28px;
    text-align: center;
  }
  button {
    display: block;
    width: 174px;
    height: 64px;
    margin: 0 auto;
    line-height: 64px;
    background: #409eff;
    border-radius: 4px;
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    margin-top: 44px;
    outline: none;
    border: 0;
    padding: 0;
  }
}
</style>
