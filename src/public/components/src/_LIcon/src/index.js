import './index.scss'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class LIcon extends Vue {
  @Prop({type: String, required: true}) icon
  @Prop({type: String, default: 'currentColor'}) color
  @Prop({type: String, default: '16px'}) size

  get style () {
    return `fill: ${this.color};font-size: ${this.size};`
  }

  render () {
    return (
      <span onClick="this.$emit('click')">
			  <svg class="icon" aria-hidden="true" style={this.style}>
          <use xlink:href={'#' + this.icon}></use>
        </svg>
        <slot></slot>
      </span>
    )
  }
}
