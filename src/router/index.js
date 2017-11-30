import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/Weather'
import Illumination from '@/components/Illumination'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/Illumination/',
      name: 'Illumination',
      component: Illumination
    }
  ]
})
