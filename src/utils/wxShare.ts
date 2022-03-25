import { getWxInfo } from '@/api/wx'
import { shartCount } from '@/api/activity'
import wx from 'weixin-js-sdk'
export default {
  wxShowMenu: async function (share: {
    shareTitle: string
    shareContent: string
    shareImg: string
    link: string
  }) {
    console.log('share :>> ', share)
    const params = { url: '1' }
    const data: any = await getWxInfo(params)
    console.log('data :>> ', data)
    wx.config({
      debug: false, //生产环境需要关闭debug模式
      appId: data.appId, //appId通过微信服务号后台查看
      timestamp: data.timestamp, //生成签名的时间戳
      nonceStr: data.nonceStr, //生成签名的随机字符串
      signature: data.signature, //签名
      jsApiList: [
        //需要调用的JS接口列表
        'onMenuShareTimeline', //分享给好友
        'onMenuShareAppMessage', //分享到朋友圈
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'translateVoice',
        'uploadVoice',
        'downloadVoice',
        'playVoice',
        'onVoicePlayEnd',
        'stopVoice'
      ]
    })
    wx.ready(function () {
      //分享到朋友圈
      wx.onMenuShareAppMessage({
        title: share.shareTitle, // 分享标题
        desc: share.shareContent, //分享描述
        link: share.link, // 分享链接
        imgUrl: share.shareImg, // 分享图标
        success: async function () {
          // window._hmt.push(["_trackEvent", "wxshare", "Timeline", "分享到朋友圈成功"]);
          const { data } = await shartCount({ activityId: 30, userId: 30 })
          console.log('分享成功记录次数 :>> ', data)
        }
      })
      //分享给朋友
      wx.onMenuShareTimeline({
        title: data.titles, // 分享标题
        desc: data.descs, //分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl,
        success: async function () {
          // window._hmt.push(["_trackEvent", "wxshare", "AppMessage", "分享给好友成功"]);
          const { data } = await shartCount({
            activityId: 30,
            userId: 30
          })
          console.log('分享成功记录次数 :>> ', data)
        }
      })
    })
  }
}
