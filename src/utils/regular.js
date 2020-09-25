// 姓名
export const NAME_REG = /^[\u4e00-\u9fa5]{2,20}$/

// 昵称
export const NICKNAME_REG = /^.{2,20}$/

// 身份证
export const IDCARD_REG = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/

// 出生证明
export const BIRTH_REG = /^[0-9,a-z,A-Z]{10}$/

// 手机号码
export const PHONE_REG = /^[1][3-9]\d{9}$/

// 0-9位数字
export const NUM_REG = /^\d{0,9}$/

// 银行卡号
export const BLANKCARD_REG = /^\d+$/

// 4位验证码
export const VERIFY_CODE = /^\d{4}$/

// 年龄
export const AGE_REG = /^\d{1,3}$/
