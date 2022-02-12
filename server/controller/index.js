const router = require('koa-router')()
const user = require('./user')
const koaBody = require('koa-body')

router.post('/user/error', koaBody({ multipart: true }), user.login)
router.post('/user/loginMsgCode', koaBody({ multipart: true }), user.loginMsgCode)

router.get('/user/loginState', koaBody({ multipart: true }), user.loginState)

module.exports = router
