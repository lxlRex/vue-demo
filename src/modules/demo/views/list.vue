<template>
  <div>
    <div @click="showmask=true">2113233</div>
   <!--  <x-mask :show.sync="showmask">
      <div style="width: 100%;height: 200px;">
        <x-scroll-box style="background-color: #fff">
          <div style="word-break: break-all;">2121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121</div>
        </x-scroll-box>
      </div>
    </x-mask> -->

    <x-dialog :show.sync="showmask">
      <div style="word-break: break-all;">2121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121</div>
    </x-dialog>

   <!--  <x-dialog>
      <div style="height: 200px;">4</div>
    </x-dialog> -->
    <div style="height: 200px;"></div>
    <x-countdown :start="start">
      <template slot-scope="props">
        <div v-if="start && !props.isFinish">{{props.currentTime}}</div>
        <div v-else @click="start = true">结束</div>
      </template>
    </x-countdown>
   <!--  <swiper :interval="1500" :current="2">
      <swiper-item v-for="(item, index) in options" :key="index">
        <div style="height: 100px;">{{item.label}}</div>
      </swiper-item>
    </swiper> -->
    <x-checker v-model="file">啊实打实大师ad阿萨德啊实打实大师ad阿萨德啊实</x-checker>
    <x-radio v-model="aaaa" :options="options"></x-radio>
    <x-input showClear v-model="qwre"></x-input>
    <native-datepicker v-model="date" ></native-datepicker>
    <x-image-choice :size="2"></x-image-choice>
    <x-textarea v-model="qwre" :maxlength="20" placeholder="123" showCount></x-textarea>
    <x-button disabled>123</x-button>
    <music-player></music-player>
    <!-- <l-icon icon="qicon-home" color="red" size="20px"></l-icon> -->
    <!-- <input type="file" name="" @change="preview($event)"> -->
    <md-button icon="spinner" size="small" type="link">123</md-button>
    <div @click="show" class="test" @touchstart="() => {}" ref="test">12123123323</div>
    <abbr title="123dfsdfsds">www</abbr>
    <kbd>quit</kbd>
     <sup @click="show"> 标签和其结束标签 </sup>
     <!-- <div style="height: 600px;"></div> -->
     <!-- <div>
       <div>
         <div>
           <button class="qwer">所发生的</button>
         </div>
       </div>
     </div> -->
  </div>
</template>

<script>
// import { axios } from '@/public/axios'
// import { HomepagePaginate } from './api'
import { MessageBox, Toast, XButton } from '@/public/components'
import MusicPlayer from './music-player'
// import XButton from '@/public/components/button'
import XTextarea from '@/public/components/textarea'
import XImageChoice from '@/public/components/image-choice'
import NativeDatepicker from '@/public/components/native-datepicker'
import XInput from '@/public/components/input'
import XRadio from '@/public/components/radio'
import XChecker from '@/public/components/checker'
import { Swiper, SwiperItem } from '@/public/components/swiper'
import XCountdown from '@/public/components/countdown'
import XDialog from '@/public/components/dialog'
import XScrollBox from '@/public/components/scroll-box'
import XMask from '@/public/components/mask'

export default{
  data () {
    return {
      showmask: false,
      start: false,
      options: [{label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}],
      date: '',
      aaaa: '1',
      qwre: '',
      file: false,
      queryData: {
        pageSize: 99999,
        addr: '全国',
        condition: '',
        brandId: '',
        orderNo: 0,
        downPaymentMin: 0,
        downPaymentMax: '',
        mouthPaymentMin: 0,
        mouthPaymentMax: ''
      }
    }
  },

  watch: {
    aaaa (val) {
      console.log(val)
    }
  },

  components: {
    MusicPlayer,
    XButton,
    XTextarea,
    XImageChoice,
    NativeDatepicker,
    XInput,
    XRadio,
    XChecker,
    Swiper,
    SwiperItem,
    XCountdown,
    XDialog,
    XScrollBox,
    XMask
  },

  mounted () {
    // this.$refs.test.addEventListener('touchstart', () => {})
  },

  created () {

    // axios.get('http://10.33.93.37:3000/users').then(data => {
    //  console.log(data)
    // });

    // axios.post('http://10.33.93.37:3000/users/login',{username: 'vvv',password: 'zzz'}).then(data => {
    //  console.log(data)
    // });

    // HomepagePaginate(this.queryData).then(data => {
    //   console.log(data)
    // })
  },

  methods: {
    preview (e) {
      let file = e.target.files[0]
      if (!e.target.files[0]) return
      let formdata = new FormData()
      formdata.append('file', file)
      // axios.post('http://10.33.93.37:3000/users/setHead', formdata).then(data => {
      //   console.log(data)
      // })
    },

    show () {
      MessageBox.alert(123)
    },

    qwe () {
      Toast.show('21333')
    }
  }
}
</script>
<style lang="scss">
.a {
  .b{
    color: red;
  }
}
.test{
  &:active{
    background: #ccc;
  }
}
.qwer {
  width: 375px;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #057df1;
}
</style>
