const Koa = require('koa')
const compress = require('koa-compress')
const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const router = require('koa-router')()
const routerApi = require('./controller')

const ip = require('./util/ip')
const logs = require('./util/winston')

const port = parseInt(process.env.PORT) || 8080
const dev = process.env.NODE_ENV !== 'production'
const server = new Koa()

server.use(compress())
// x-response-time
server.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

server.use(async (ctx, next) => {
  // logs.log(`From：${ip.getClientIp(ctx.req)}`)
  ctx.res.removeHeader('X-Powered-By')
  await next()
})

server.use(function(ctx, next) {
  return next().catch((err) => {
    switch (err.status) {
      case 400:
        ctx.status = 400
        ctx.body = { msg: 'Front end parameter error' }
        break
      case 401:
        ctx.status = 401
        ctx.body = { msg: 'account or password is incorrect' }
        break
      default:
        throw err
    }
  })
})

server.use(async (ctx, next) => {
  let user = ctx.cookies.get('user')
  if (user) {
    jwt.verify(user, 'test', function(err, decoded) {
      if (decoded) {
        ctx.state = decoded
      } else {
        ctx.status = 401
      }
    })
  }
  await next()
})

server.on('error', (err, ctx) => {
  logs.error('server error', err, ctx)
})
server.use(
  koaJwt({ secret: 'test', passthrough: true }).unless({
    path: ['/user/error'],
  }),
)

router.use(routerApi.routes())
server.use(router.routes())
server.use(
  router.allowedMethods({
    throw: true,
    notImplemented: () => console.log('Request url not found'),
    methodNotAllowed: () => console.log('Request method error'),
  }),
)
server.listen(port, () => {
  logs.log('info', `> Server is starting  http://localhost:${port}`)
})
