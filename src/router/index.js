import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/:filter',
      name: 'home',
      component: Home,
      props: true
    }
  ]
})

const state = ['all', 'active', 'completed']
router.beforeEach((to, from, next) => {
  if (state.some(record => record === to.params.filter)) {
    next()
  } else {
    next('/all')
  }
})

export default router
