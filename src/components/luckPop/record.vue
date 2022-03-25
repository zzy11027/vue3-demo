<template lang="html">
  <teleport to="body">
    <van-overlay :show="show" :lock-scroll="false">
      <div class="wrapper">
        <div class="prizeList">
          <ul class="listTop listTitle">
            <li>中奖用户</li>
            <li>中奖项</li>
          </ul>
          <div class="listContainer">
            <ul
              class="listContainer listTop"
              v-for="(item, index) in list"
              :key="index"
            >
              <li>{{ item.userNo }}</li>
              <li>{{ item.prizeName }}</li>
            </ul>
          </div>
        </div>
        <button @click="isShow">确定</button>
      </div>
    </van-overlay>
  </teleport>
  <!-- <teleport to="body">
    <van-popup :show="show" style="width: 95%; border-radius: 6px">

    </van-popup>
  </teleport> -->
</template>
<script setup lang="ts">
/* eslint-disable */
defineProps({
  show: Boolean,
  list: {
    type: Array as () => { userNo: string; prizeName: string }[],
    // type: Array as PropType<{ prizeName: string; userNo: string }[]>,
    required: true
  }
})
const emit = defineEmits(['isshow'])
const isShow = () => {
  emit('isshow', false)
}
</script>
<style lang="scss" scoped>
:deep(.van-popup) {
  background: #df2929;
}
.wrapper {
  width: 658px;
  height: 384px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 80px;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
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
    margin-top: 40px;
    outline: none;
    border: 0;
    padding: 0;
  }
}
.listTitle {
  border-radius: 4px;
}
.prizeList {
  border-radius: 10px;
  height: 340px;

  background: #ffffff;
  overflow: hidden;
  text-align: center;
}
.listContainer {
  height: 240px;
  overflow: auto;
  li {
    width: 40%;
    text-align: center;
    overflow: hidden;
  }
}

.listTop {
  display: flex;
  justify-content: space-around;
  height: 80px;
  line-height: 80px;
  font-weight: bold;
  border-top: 1px solid #eaeaea;
}
.listContainer:last-child {
  border-bottom: 1px solid #eaeaea;
}
.listContainer {
  font-weight: normal;
}
</style>
