// const tempJson = [
//   // { type: 'imageText', options: [], data: [] },
//   // {
//   //   type: 'banner',
//   //   options: [],
//   //   data: [
//   //     { name: 'picture1', url: require('@/assets/images/picture.jpg').default },
//   //     { name: 'picture2', url: require('@/assets/images/picture2.png').default }
//   //   ]
//   // },
//   // {
//   //   type: 'texts',
//   //   data: [],
//   //   remarks: '我是文本内容',
//   //   title: '我是title',
//   //   remarksFontSize: 20,
//   //   titleFontSize: activityId.value
//   // },
//   {
//     type: 'Grid',
//     data: [
//       {
//         name: '背景图',
//         url: 'https://etest.foton.com.cn/shareCars/activity/interactCenter210715/images/awardBg.png'
//       }
//     ],
//     options: {},
//     radio: '4',
//     isTimes: 'a',
//     isRecord: 'record',
//     turnArr: [
//       {
//         isPrize: true,
//         prizeType: 'material',
//         couponCode: 'a11111',
//         prizeName: '奖品1',
//         whiteList: '',
//         prizeNum: '10',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-0.png').default,
//           activeSrc: require('@/assets/images/active-0.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品2',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-1.png').default,
//           activeSrc: require('@/assets/images/active-1.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品3',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-2.png').default,
//           activeSrc: require('@/assets/images/active-2.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品4',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-3.png').default,
//           activeSrc: require('@/assets/images/active-3.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品5',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-4.png').default,
//           activeSrc: require('@/assets/images/active-4.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品6',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-5.png').default,
//           activeSrc: require('@/assets/images/active-5.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品7',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-6.png').default,
//           activeSrc: require('@/assets/images/active-6.png').default,
//           form: {}
//         }
//       },
//       {
//         isPrize: true,
//         prizeType: 'coupon',
//         couponCode: '',
//         prizeName: '奖品8',
//         whiteList: '',
//         prizeNum: '',
//         imgsInfo: {
//           name: 'hongbao.png',
//           url: require('@/assets/images/default-7.png').default,
//           activeSrc: require('@/assets/images/active-7.png').default,
//           form: {}
//         }
//       }
//     ],
//     imgArr: [
//       {
//         name: 'hongbao.png',
//         url: require('@/assets/images/0.png').default,
//         form: {}
//       }
//     ]
//   },
//   {
//     type: 'iamges',
//     data: [
//       {
//         name: '图片1',
//         url: 'https://etest.foton.com.cn/shareCars/activity/interactCenter210610/images/img2.png'
//       }
//     ]
//   }
//   // {
//   //   type: 'turntable',
//   //   data: [
//   //     {
//   //       name: '背景图',
//   //       url: 'https://etest.foton.com.cn/shareCars/activity/interactCenter210715/images/awardBg.png'
//   //     }
//   //   ],
//   //   options: {},
//   //   radio: '4',
//   //   isTimes: 'a',
//   //   isRecord: 'record',
//   //   turnArr: [
//   //     {
//   //       isPrize: true,
//   //       prizeType: 'material',
//   //       couponCode: 'a11111',
//   //       prizeName: '奖品1',
//   //       whiteList: '',
//   //       prizeNum: '10',
//   //       imgsInfo: {
//   //         name: 'hongbao.png',
//   //         url: require('@/assets/images/0.png').default,
//   //         form: {}
//   //       }
//   //     },
//   //     {
//   //       isPrize: true,
//   //       prizeType: 'coupon',
//   //       couponCode: '',
//   //       prizeName: '奖品2',
//   //       whiteList: '',
//   //       prizeNum: '',
//   //       imgsInfo: {
//   //         name: 'hongbao.png',
//   //         url: require('@/assets/images/0.png').default,
//   //         form: {}
//   //       }
//   //     },
//   //     {
//   //       isPrize: true,
//   //       prizeType: 'coupon',
//   //       couponCode: '',
//   //       prizeName: '奖品3',
//   //       whiteList: '',
//   //       prizeNum: ''
//   //     },
//   //     {
//   //       isPrize: true,
//   //       prizeType: 'coupon',
//   //       couponCode: '',
//   //       prizeName: '奖品4',
//   //       whiteList: '',
//   //       prizeNum: '',
//   //       imgsInfo: {
//   //         name: 'hongbao.png',
//   //         url: require('@/assets/images/0.png').default,
//   //         form: {}
//   //       }
//   //     }
//   //   ],
//   //   imgArr: [
//   //     {
//   //       name: 'hongbao.png',
//   //       url: require('@/assets/images/0.png').default,
//   //       form: {}
//   //     }
//   //   ]
//   // }

//   // { type: 'canvasPoster', options: [], data: [] }
// ]
