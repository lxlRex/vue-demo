export const login = async ({userName, password}) => {
  let userInfo = Object.assign({}, {userName, password}, {token: '123', mobile: '18862144444', nickName: '呵呵'})

  return {
    code: 0,
    data: userInfo
  }
}
