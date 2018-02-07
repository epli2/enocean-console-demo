<template>
  <div>
    <section class="row">
      <div class="Chart col-6 col-sm-6">
        <div class="Chart">
          <temperature-component :range="'all'" :height="200"></temperature-component>
        </div>
      </div>
      <div class="Chart col-6 col-sm-6">
        <humidity-component :range="'all'" :height="200"></humidity-component>
      </div>
    </section>
    <section class="row">
      <div class="Chart col-6 col-sm-6">
        <illumination-component :range="'all'" :height="200"></illumination-component>
      </div>
      <div class="Chart col-6 col-sm-6">
        <audio-component :range="'all'" :height="200"></audio-component>
      </div>
    </section>
  </div>
</template>

<script>
import TemperatureComponent from '@/components/Temperature'
import HumidityComponent from '@/components/Humidity'
import IlluminationComponent from '@/components/Illumination'
import AudioComponent from '@/components/Audio'

export default {
  components: {
    TemperatureComponent,
    HumidityComponent,
    IlluminationComponent,
    AudioComponent
  }
}
</script>
