import { computed, ref } from 'vue'

import { Dialog } from 'vant'
import QRCode from 'qrcode2'
import html2canvas from 'html2canvas'

const html2 = {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      show: false,
      dataImg: ''
    }
  },
  created() {
    console.log('hello from mixin!')
    // this.QCode()
  },
  methods: {
    createPoster() {
      const _this: any = this
      const poster: any = document.body
      const html2canvas1: any = html2canvas
      html2canvas1(poster, {
        dpi: window.devicePixelRatio * 2,
        backgroundColor: '#fff',
        useCORS: true,
        scale: 2,
        async: true
      }).then((canvas: any) => {
        _this.dataImg = canvas.toDataURL('image/jpeg')
        _this.show = true
        console.log('_this.dataImg :>> ', _this.dataImg)
      })
    },
    QCode(): void {
      const qrcode = new QRCode('qrCode', {
        width: 150,
        height: 150, // 高度
        text: `asdfghqwer`,
        colorDark: '#000',
        colorLight: '#fff'
      })
    }
  }
}

export default html2
