import { Loading } from '@/public/components'

const install = axios => {
  axios.interceptors.request.use(
    config => {
      let { showLoading = true } = config
      if (showLoading) Loading.show()
      return config
    },
    error => {
      Loading.close()
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      let {
        config: { showLoading = true }
      } = response

      if (showLoading) Loading.close()
      return response.data
    },
    error => {
      Loading.close()
      return Promise.reject(error)
    }
  )
}

export default {
  use: install
}
