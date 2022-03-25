<template lang="html">
  <teleport to="body">
    <van-overlay :show="show" :lock-scroll="true">
      <div class="teleportLogin">
        <div class="fontoLogo">
          <img src="@/assets/fotonlogo.png" alt="" />
        </div>
        <div class="tab">
          <a :class="{ active: tab }" @click="tabLogin(1)">登录</a>
          <!-- <a :class="{ active: !tab }" @click="tabLogin(0)">注册</a> -->
        </div>
        <div class="tabContainer">
          <div class="login" v-if="tab">
            <van-form @submit="onLogin">
              <van-cell-group inset>
                <!-- :rules="[{ pattern, message: '用户名不正确' }]" -->
                <van-field
                  v-model="loginState.username"
                  type="number"
                  name="username"
                  :error-message="errorMsg"
                  placeholder="请输入福田e家帐号"
                  :rules="[{ required: true, message: '请输入福田e家帐号' }]"
                />
                <van-field
                  type="password"
                  v-model="loginState.password"
                  name="password"
                  :error-message="errorMsg"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请输入密码' }]"
                />
                <!-- <div class="codeInput">
                  <van-field
                    v-model="loginState.password"
                    type="number"
                    name="code"
                    placeholder="验证码"
                    :rules="[{ required: true, message: '请填写验证码' }]"
                  />
                  <van-button
                    class="getCode"
                    size="mini"
                    color="#edf1fd"
                    round
                    type="primary"
                    @click="getCode"
                    >{{ codeText }}</van-button
                  >
                </div> -->
              </van-cell-group>
              <div class="tj">
                <van-button
                  round
                  block
                  type="primary"
                  color="#2a63ff"
                  native-type="submit"
                >
                  登录
                </van-button>
              </div>
            </van-form>
          </div>
          <div class="register" v-else>
            <van-form @submit="onRegister">
              <van-cell-group inset>
                <van-field
                  v-model="registerState.phone"
                  name="phone"
                  type="number"
                  :error-message="errorMsgs"
                  placeholder="请输入手机号"
                  :rules="[{ pattern, message: '请输入正确手机号' }]"
                />
                <van-field
                  v-model="registerState.name"
                  name="name"
                  placeholder="请输入姓名"
                  :rules="[{ required: true, message: '请输入姓名' }]"
                />
                <div class="codeInput">
                  <van-field
                    v-model="registerState.code"
                    name="code"
                    placeholder="请输入验证码"
                    :rules="[{ required: true, message: '请输入验证码' }]"
                  />
                  <van-button
                    class="getCode"
                    size="mini"
                    color="#edf1fd"
                    round
                    type="primary"
                    @click="getCodes"
                    >{{ codeTexts }}</van-button
                  >
                </div>
                <van-field
                  v-model="registerState.password"
                  name="password"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请输入密码' }]"
                />
                <van-field
                  v-model="registerState.resetPassword"
                  name="resetPassword"
                  placeholder="请再次输入密码"
                  :rules="[{ validator, message: '密码不一致' }]"
                />
              </van-cell-group>
              <div class="tj">
                <van-button
                  round
                  block
                  type="primary"
                  color="#2a63ff"
                  native-type="submitRegister"
                >
                  注册
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
        <van-icon
          @click="show = false"
          class="iconClose"
          color="#fff"
          size="36px"
          name="close"
        />
      </div>
    </van-overlay>
  </teleport>
</template>
<script setup lang="ts">
import { Notify, Toast } from 'vant'
import { ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
const internalInstance: any = getCurrentInstance()
const emitter = internalInstance.appContext.config.globalProperties.emitter // 用以候去全局方法，并在登录后调用抽奖组件中的次数统计
const store = useStore()
const show = ref(true)
const tab = ref(true)
const codeText = ref('获取验证码')
const codeTexts = ref('获取验证码')
const errorMsg = ref('')
const errorMsgs = ref('')
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
const tabLogin = (param: number) => {
  tab.value = param === 0 ? false : true
}
// 倒计时
const countDown = (param: string) => {
  let count = 60
  param === 'login'
    ? (codeText.value = `(${count})s`)
    : (codeTexts.value = `(${count})s`)
  const intervalt = setInterval(() => {
    if (count <= 0) {
      clearInterval(intervalt)
      param === 'login'
        ? (codeText.value = '获取验证码')
        : (codeTexts.value = '获取验证码')
      return
    }
    count--
    param === 'login'
      ? (codeText.value = `(${count})s`)
      : (codeTexts.value = `(${count})s`)
  }, 1000)
}
// 登录获取验证码
const getCode = () => {
  const username = loginState.username
  if (pattern.test(username)) {
    errorMsg.value = ''
    codeText.value === '获取验证码' ? countDown('login') : null
  } else {
    errorMsg.value = '用户名不正确'
  }
}
// 注册获取验证码
const getCodes = () => {
  const phone = registerState.phone
  if (pattern.test(phone)) {
    errorMsgs.value = ''
    codeTexts.value === '获取验证码' ? countDown('reg') : null
  } else {
    errorMsgs.value = '用户名不正确'
  }
}
// 登录相关
const loginState = reactive({
  username: '',
  password: ''
})
const onLogin = (values: any) => {
  console.log('submit', values)
  store
    .dispatch('user/SING_IN', values)
    .then(async (res: any) => {
      Notify({
        type: 'success',
        message: '登录成功',
        duration: 2000
      })
      show.value = false
      // 首次登录调用抽奖组件统计次数
      emitter.emit('setPrizeCount', 1)
    })
    .catch((error: any) => {
      console.log('error :>> ', error)
      Toast(`账号或密码错误`)
    })
}

// 注册相关
const registerState = reactive({
  phone: '',
  name: '',
  code: '',
  password: '',
  resetPassword: ''
})
const validator = (val: any) => registerState.password == val
const onRegister = (values: any) => {
  console.log('submit', values)
}
</script>
<style lang="scss" scoped>
.teleportLogin {
  width: 448px;
  background: #fff;
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 220px;
  position: relative;
  .iconClose {
    position: absolute;
    bottom: -18%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .fontoLogo img {
    display: block;
    width: 25%;
    margin: 0 auto;
    padding-top: 16px;
  }
  .tab {
    margin: 20px auto;
    width: 70%;
    height: 80px;
    line-height: 80px;
    background-color: #edf1fd;
    border-radius: 50px;
    text-align: center;
    overflow: hidden;
    .active {
      color: #2a63ff;
    }
    a {
      color: #2a63ff;
      font-size: 26px;
      margin: 0 20px;
      position: relative;
    }
    .active:after {
      content: '';
      display: block;
      background-color: #2a63ff;
      width: 56px;
      height: 6px;
      position: absolute;
      bottom: -7px;
      left: 0;
    }
  }
  .tabContainer {
    width: 100%;
    padding: 24px 0;
    .codeInput {
      display: flex;
      align-items: center;
      .van-cell {
        flex: 4;
      }
      .getCode {
        flex: 3;
        font-size: 18px;
        color: #2a63ff !important;
      }
    }
    .tj {
      margin: 10px 40px;
    }
  }
}
</style>
