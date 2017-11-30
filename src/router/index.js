import Vue from 'vue'
import Router from 'vue-router'
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Illumination from '@/components/Illumination'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Temperature',
      component: Temperature
    },
    {
      path: '/Humidity/',
      name: 'Humidity',
      component: Humidity
    },
    {
      path: '/Illumination/',
      name: 'Illumination',
      component: Illumination
    }
  ]
})
