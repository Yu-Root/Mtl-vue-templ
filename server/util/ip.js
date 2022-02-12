module.exports = {
  getClientIp: function(req) {
    return (
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    )
  },
}
