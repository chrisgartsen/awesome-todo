import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedin = LocalStorage.getItem('loggedin')
    if(!loggedin && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
