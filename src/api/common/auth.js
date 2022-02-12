import ajax from '../../lib/axios'

const authApi = {
  // error
  async loginState(data) {
    return await ajax.get('/api/user/loginState', data)
  },
}

export default authApi
