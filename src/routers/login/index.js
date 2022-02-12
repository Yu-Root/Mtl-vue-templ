const login = () => import(/* webpackChunkName: "error" */ '../../pages/login/index.vue')

const loginRouters = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
]

export default loginRouters
