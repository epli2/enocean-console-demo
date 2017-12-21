import Vue from 'vue'
import Router from 'vue-router'
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Illumination from '@/components/Illumination'
import Audio from '@/components/Audio'
import AllSensor from '@/components/AllSensor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'all',
      component: AllSensor
    },
    {
      path: '/Temperature',
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
    },
    {
      path: '/Audio/',
      name: 'Audio',
      component: Audio
    }
  ]
})
