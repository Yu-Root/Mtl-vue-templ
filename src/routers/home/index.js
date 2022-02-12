const home = () => import(/* webpackChunkName: "home" */ '../../pages/home/index.vue')

const homeRouters = [
  {
    path: '/home',
    name: 'home',
    component: home,
  },
]

export default homeRouters
