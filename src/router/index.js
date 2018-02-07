import Vue from 'vue'
import Router from 'vue-router'
import Temperature from '@/components/Temperature'
import Humidity from '@/components/Humidity'
import Illumination from '@/components/Illumination'
import Audio from '@/components/Audio'
import AllSensor from '@/components/AllSensor'
import SingleSensor from '@/components/SingleSensor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'all',
      component: AllSensor
    },
    {
      path: '/single',
      component: SingleSensor,
      children: [
        {
          path: 'temperature',
          name: 'Temperature',
          component: Temperature
        },
        {
          path: 'humidity',
          name: 'Humidity',
          component: Humidity
        },
        {
          path: 'illumination',
          name: 'Illumination',
          component: Illumination
        },
        {
          path: 'audio',
          name: 'Audio',
          component: Audio
        }
      ]
    }
  ]
})
