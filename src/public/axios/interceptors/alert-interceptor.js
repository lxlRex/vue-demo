import { LMessageBox } from '@/public/components'
import { ApiStatus } from '../../config'

const install = axios => {
  axios.interceptors.response.use(
    response => {
      let {
        config: { showAlert = true },
        data: { code = -1, message = '连接超时，请检查网络' }
      } = response

      if (showAlert && code !== ApiStatus.success.code) {
        LMessageBox.alert(message)
      }

      return response
    },
    error => {
      LMessageBox.alert('连接超时，请检查网络')
      return Promise.reject(error)
    }
  )
}

export default {
  use: install
}
