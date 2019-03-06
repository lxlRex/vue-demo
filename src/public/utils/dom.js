/* istanbul ignore next */

import Vue from 'vue'

const isServer = Vue.prototype.$isServer
/* eslint-disable */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const ieVersion = isServer ? 0 : Number(document.documentMode)

/* istanbul ignore next */
/**
 * @desc trim 函数 trim string 中的所有空格
 * @param {string} string 字符串
 * @returns {string}
 */
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/* istanbul ignore next */
/**
 * @desc parents 获取所有父级
 * @param {Element} el 元素
 * @param {string} selector 选择器
 * @returns {[Element]}
 */
export const parents = function (el, selector) {
  let node = el, nodes = []
    , selectedDOM = typeof selector === 'string' ? document.querySelector(selector) : selector

  while (!node.isEqualNode(document.documentElement)) {
    node = node.parentElement

    if (selector && node.isEqualNode(selectedDOM)) {
      return [node]
    } else {
      nodes.push(node)
    }
  }

  return nodes
}

/* istanbul ignore next */
/**
 * @desc 中划线转换成驼峰
 * @param {string} name name
 * @returns {*}
 */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/* istanbul ignore next */
/**
 * @desc 绑定一个事件
 * @param {Element} element dom 元素
 * @param {string} event 事件名
 * @param {Function} handler 处理函数
 */
export function on (element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
/**
 * @desc 解除绑一个事件
 * @param {Element} element dom 元素
 * @param {string} event 事件名
 * @param {function} handler 处理函数
 */
export function off (element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false)
  }
}

/* istanbul ignore next */
/**
 * @desc 绑定一个事件 -- 只触发一次
 * @param {Element} el dom 节点
 * @param {string} event 事件名
 * @param {function} fn 函数
 */
export function once (el, event, fn) {
  let listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

/* istanbul ignore next */
/**
 * @desc 是否存在某个 class
 * @param {Element} el dom 节点
 * @param {string} cls class 名称
 * @returns {boolean}
 */
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
/**
 * @desc 添加一个 class 到节点上
 * @param {Element} el dom 节点
 * @param {string} cls class 名称
 */
export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  let classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
/**
 * @desc 移除一个 class 从节点上
 * @param el {Element} dom 节点
 * @param cls {string} class 名
 */
export function removeClass (el, cls) {
  if (!el || !cls) return
  let classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

/* istanbul ignore next */
/**
 * @desc 获取 style 信息
 * @type {Function}
 */
export const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'styleFloat'
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100
        } catch (e) {
          return 1.0
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null)
    }
  } catch (e) {
    return element.style[styleName]
  }
} : function(element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    let computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

/* istanbul ignore next */
/**
 * @desc 设置 style
 * @param element {Element}
 * @param styleName {string}
 * @param value  {string}
 */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return

  if (typeof styleName === 'object') {
    for (let prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop])
      }
    }
  } else {
    styleName = camelCase(styleName)
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')'
    } else {
      element.style[styleName] = value
    }
  }
}

/* istanbul ignore next */
/**
 * @desc 插入样式
 * @param {string} selector 选择器
 * @param {string} style 样式
 */
export function insertStyleSheet (selector, style) {
  let styleEl = document.createElement('style');

  styleEl.type = 'text/css';
  document.head.appendChild(styleEl);
  styleEl.appendChild(document.createTextNode(''));

  let styleSheet = styleEl.sheet;
  if('insertRule' in styleSheet) {
    styleSheet.insertRule(`${selector}{${style}}`, styleSheet.cssRules.length);
  } else if('addRule' in styleSheet) {
    styleSheet.addRule(selector, rules, styleSheet.cssRules.length);
  }
  styleEl.innerText += `${selector}{${style}}`
}


/**
 * 滚到到指定高度
 *
 * @export
 * @param {dom} _container
 * @param {string} _to
 * @param {string} _time
 * @param {string} callback
 */
export function scrollTo(_container, _to, _time, callback) {
  let scrollFrom = parseInt(_container.scrollTop),
    i = 0,
    runEvery = 5;
  let to = parseInt(_to);
  let time = _time / runEvery;
  let container = _container;
  let interval = setInterval(function () {
    i++;
    container.scrollTop = (to - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      if (callback) callback();
      clearInterval(interval);
    }
  }, runEvery);
}

/**
 * 滚动到指定元素
 *
 * @export
 * @param {dom} container
 * @param {string} selected
 * @returns
 */
export function scrollIntoView(container, selected) {
  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const top = selected.offsetTop;
  const bottom = selected.offsetTop + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
