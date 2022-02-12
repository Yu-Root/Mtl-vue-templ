const notFound = () => import(/* webpackChunkName: "notFound" */ '../../pages/error/404.vue')

const errorRouters = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound,
  },
]

export default errorRouters
