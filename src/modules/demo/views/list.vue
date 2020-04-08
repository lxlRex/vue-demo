<template>
  <div>
    <x-button @click="showScrollBox=true">showScrollBox</x-button>
    <x-button @click="showmask=true">showDialog</x-button>
    <x-button @click="showLoading">showLoading</x-button>
    <x-button @click="showToast">showToast</x-button>
   <x-mask v-if="showScrollBox" :show="true" @maskClick="showScrollBox = false">
      <div style="width: 100%;height: 200px;background: #fff;padding: 15px;">
        <x-scroll-box>
          <div style="word-break: break-all;">2121213212121321212132121213212121321212132121213212121321212132121213212121
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            32121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            12132121213212121321212132121213212121321212132121213212121321212132121213212121321212132121213212121321
            2121321212132121213212121321212132121213212121321212132121</div>
        </x-scroll-box>
      </div>
    </x-mask>

    <x-dialog :show.sync="showmask" @close="showmask = false">
      <div style="word-break: break-all;">
        212121321212132121213212121321212132121213212121321212132121213212
        12132121213212121321212132121213212121321212132121213212121321212132121213212121321
        212132121213212121321212132121213212121321212132121213212121321212132121213212121
        32121213212121321212132121213212121321212132121
      </div>
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
    <x-checkbox v-model="checkbox" :options="options"></x-checkbox>
    <x-input showClear v-model="qwre"></x-input>
    <native-datepicker v-model="date" ></native-datepicker>
    <x-image-choice v-model="images" :size="5"></x-image-choice>
    <x-textarea v-model="qwre" :maxlength="20" placeholder="123" showCount></x-textarea>
    <x-button disabled>123</x-button>
    <music-player></music-player>
    <!-- <l-icon icon="qicon-home" color="red" size="20px"></l-icon> -->
    <!-- <input type="file" name="" @change="preview($event)"> -->
<!--    <md-button icon="spinner" size="small" type="link">123</md-button>-->
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
import XTextarea from '@/public/components/src/textarea'
import XImageChoice from '@/public/components/src/image-choice'
import NativeDatepicker from '@/public/components/src/native-datepicker'
import XInput from '@/public/components/src/input'
import XRadio from '@/public/components/src/radio'
import XCheckbox from '@/public/components/src/checkbox'
import XChecker from '@/public/components/src/checker'
import { Swiper, SwiperItem } from '@/public/components/src/swiper'
import XCountdown from '@/public/components/src/countdown'
import XDialog from '@/public/components/src/dialog'
import XScrollBox from '@/public/components/src/scroll-box'
import XMask from '@/public/components/src/mask'
import Loading from '@/public/components/src/Loading'

export default {
  data () {
    return {
      showScrollBox: false,
      images: '',
      checkbox: '1',
      showmask: false,
      start: false,
      options: [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }],
      date: '',
      aaaa: '1',
      qwre: '',
      file: false
    }
  },

  methods: {
    show () {
      MessageBox.alert(123)
    },

    showLoading () {
      Loading.show()
      setTimeout(Loading.close, 3000)
    },

    showToast () {
      // Toast.show('呵呵')

      window.open('http://kdjd.ycode.cn/api/sso/login?username=hgkz1&ssoCookieKey=2cba9153-ce5f-4c79-8248-4dea07dd9190&confId=1150392')
    },

    qwe () {
      Toast.show('21333')
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
    XCheckbox,
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
