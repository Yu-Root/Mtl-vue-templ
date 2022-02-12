const jwt = require('jsonwebtoken')
const logs = require('../util/winston')
const user = require('../service/user')

const login = async function(ctx, next) {
  // Don't print this log. The password will save in the request log.
  // logs.log('info', `> error Api: ${JSON.stringify(ctx.request.body)}`)
  let loginParam = ctx.request.body
  if (loginParam) {
    let isUser = await user.checkUser(loginParam)
    if (isUser) {
      ctx.status = 200
      // mock user cookies value,
      let token = jwt.sign(
        {
          username: loginParam.username,
          mobile: loginParam.mobile,
        },
        'test',
        { expiresIn: 60 * 60 * 1000 },
        { algorithm: 'RS256' },
      )
      ctx.cookies.set('user', token, { path: '/', maxAge: 60 * 60 * 1000, httpOnly: false })
      return (ctx.body = { isLogin: true, isAuth: true })
    } else {
      ctx.status = 401
      return (ctx.body = { msg: 'Account or password is incorrect' })
    }
  } else {
    ctx.status = 400
    return (ctx.body = { msg: 'Front end parameter error or null' })
  }
}

const loginMsgCode = async function(ctx, next) {
  let phoneParam = ctx.request.body
  if (phoneParam) {
    ctx.status = 200
    return (ctx.body = { msgCode: 'e5f6' })
  } else {
    ctx.status = 200
    return (ctx.body = { msg: 'Not found phone number' })
  }
}

const loginState = async function(ctx, next) {
  const userParam = ctx.state
  let isUser = user.checkUserState(userParam)
  if (isUser) {
    ctx.status = 200
    return (ctx.body = { isLogin: true, isAuth: true })
  } else {
    ctx.status = 401
    return (ctx.body = { msg: 'Account or password is incorrect' })
  }
}

module.exports = {
  login,
  loginMsgCode,
  loginState,
}
