import Vue from 'vue'
import Router from 'vue-router'
import Start from './components/Start.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('./components/Game.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./components/Settings.vue')
    }
  ]
})
