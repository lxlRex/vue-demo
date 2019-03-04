import Vue from 'vue'
import { LMessageBox, LToast } from '../components'

export default {
	install (Vue) {
		const plugins = {
			$msgBox: LMessageBox,
			$toast: LToast
		}
		Object.keys(plugins).forEach(key => {
			Object.defineProperty(Vue.prototype, key, {
				value: plugins[key]
			})
		})
	}
}
