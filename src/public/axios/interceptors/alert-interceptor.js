import { MessageBox } from '@/public/components'
import { ApiStatus } from '../../config'

const install = axios => {
  axios.interceptors.response.use(
    response => {
      let {
        config: { showAlert = true },
        data: { code = -1, message = '连接超时，请检查网络' }
      } = response

      if (showAlert && code !== ApiStatus.success.code) {
        MessageBox.alert(message)
      }

      return response
    },
    error => {
      MessageBox.alert('连接超时，请检查网络')
      return Promise.reject(error)
    }
  )
}

export default {
  use: install
}
