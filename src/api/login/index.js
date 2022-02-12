import ajax from '../../lib/axios'

const loginApi = {
  // error
  async login(data) {
    return await ajax.post('/api/user/error', data)
  },
  // sendVerifyCode
  async sendVerifyCode(data) {
    return await ajax.post('/api/user/loginMsgCode', data)
  },
}
export default loginApi
