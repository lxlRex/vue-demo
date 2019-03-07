<template>
  <div class="image-choice">
    <div v-for="(item, index) in innerValue" :key="index" class="image-choice__item">
      <div class="image-choice__remove" @click="removeHandler(index)"></div>
      <img class="image-choice__img" :src="item">
    </div>

    <div v-if="innerValue.length < size" class="image-choice__item image-choice__item--add">
      <input :id="`image-choice-${_uid}`" type="file" accept="image/*" :size="size" :multiple="multiple" @change="choiceHandler($event)">
      <label :for="`image-choice-${_uid}`">
        <div class="image-choice__icon">+</div>
        <div class="image-choice__prompt">{{prompt}}</div>
      </label>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { compressImages } from '@/public/utils/image-processor'

export default {
  data () {
    return {
      innerValue: []
    }
  },

  props: {
    value: { type: [String, Array], default: '' },
    prompt: { type: String, default: '上传图片' },
    size: { type: Number, default: 1 },
    multiple: { type: Boolean, default: false }
  },

  watch: {
    value: {
      handler (value) {
        this.innerValue = Array.isArray(value) ? value : this.value ? [value] : []
      },
      immediate: true
    },

    innerValue (val) {
      if (!Array.isArray(this.value) && this.size === 1) {
        this.$emit('input', val[0])
      } else {
        this.$emit('input', val)
      }
    }
  },

  methods: {
    removeHandler (index) {
      this.innerValue = this.innerValue.filter((o, i) => i !== index)
    },

    /**
     * @desc 选择图片
     */
    async choiceHandler (e) {
      let files = e.target.files
      let compressFiles = await compressImages(files)

      compressFiles.forEach(async ({compressFile, name}) => {
        let fd = new FormData()
        fd.append('imgFile', compressFile, name)
        let { data: { data } } = await axios.post('//order-api.tychou.com/common/private/image/uploadPictureAndThumbnail.do', fd)
        this.innerValue.push(data)
      })

      e.target.value = null
    }
  }
}
</script>
<style lang="scss">
@import '~SassMagic/src/mixins/BEM';

$imagesize: 100px;

$remove_width: 20px;
$remove_height: 2px;
$remove_bg: rgba(0, 0, 0, 0.4);
$remove_color: #fff;

@include b (image-choice) {
  display: flex;
  flex-wrap: wrap;

  @include e (item) {
    flex-basis: $imagesize;
    height: $imagesize;
    position: relative;

    > img {
      display: block;
      width: 100%;
      height: 100%;
    }

    @include m (add) {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f7f8f9;

      > input {
        display: none;
      }

      label {
        text-align: center;
      }
    }
  }

  @include e (remove) {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    border-bottom-left-radius: 6px;

    &:before{
      content: '';
      position: absolute;
      display: block;
      width: $remove_width;
      height: $remove_height;
      background: $remove_color;
      transform: rotate(45deg);
      top: 8px;
    }
    &:after{
      content: '';
      position: absolute;
      display: block;
      width: $remove_width;
      height: $remove_height;
      background: $remove_color;
      transform: rotate(-45deg);
      top: 8px;
    }
  }

  @include e (icon) {
    font-size: 36px;
  }
}
</style>
