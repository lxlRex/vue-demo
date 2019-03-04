import { LLoading } from '@/public/components'

const install = axios => {
  axios.interceptors.request.use(
    config => {
      let { showLoading = true } = config
      if (showLoading) LLoading.show()
      return config
    },
    error => {
      LLoading.close()
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      LLoading.close()
      return response.data
    },
    error => {
      LLoading.close()
      return Promise.reject(error)
    }
  )
}

export default {
  use: install
}
