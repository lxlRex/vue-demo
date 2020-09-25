import logo from './images/logo.png'

const data = {
  logo: logo,
  head: logo
}
let type = 'head'
const imgError = e => {
  e.target.src = data[type]
}
export default {
  bind(el, binding) {
    type = binding.value || 'head'
    if (el.src === '') {
      imgError({ target: el })
    }
    el.addEventListener('error', imgError)
  },
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind(el) {
    el.removeEventListener('error', imgError)
  }
}
