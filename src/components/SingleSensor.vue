<template>
  <div>
    <section class="row text-center placeholders">
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ max }} {{ unit }}</h4>
        <h5>最高{{ typestr }}</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ min }} {{ unit }}</h4>
        <h5>最低{{ typestr }}</h5>
      </div>
      <div class="col-6 col-sm-4 placeholder">
        <h4>{{ average }} {{ unit }}</h4>
        <h5>平均{{ typestr }}</h5>
      </div>
    </section>
    <router-view :range="range" :timeUnit="timeUnit" :height="285" v-on:calculated="apply"></router-view>
    <div class="buttons">
      <div class="btn-group" role="group">
        <button v-on:click="setRange('1min')" type="button" class="btn btn-secondary" :class="{ active: range === '1min' }">1分</button>
        <button v-on:click="setRange('10min')" type="button" class="btn btn-secondary" :class="{ active: range === '10min' }">10分</button>
        <button v-on:click="setRange('hour')" type="button" class="btn btn-secondary" :class="{ active: range === 'hour' }">1時間</button>
        <button v-on:click="setRange('all')" type="button" class="btn btn-secondary" :class="{ active: range === 'all' }">全部</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      range: 'all',
      max: Number,
      min: Number,
      average: Number
    }
  },
  computed: {
    unit () {
      switch (this.$route.path) {
        case '/single/temperature':
          return '℃'
        case '/single/humidity':
          return '%'
        case '/single/illumination':
          return ''
        case '/single/audio':
          return ''
      }
    },
    typestr () {
      switch (this.$route.path) {
        case '/single/temperature':
          return '気温'
        case '/single/humidity':
          return '湿度'
        case '/single/illumination':
          return '照度'
        case '/single/audio':
          return '音量'
      }
    },
    timeUnit () {
      switch (this.range) {
        case '1min':
          return 'second'
        case '10min':
          return 'minute'
        case 'hour':
          return 'minute'
        case 'all':
          return 'minute'
      }
    }
  },
  methods: {
    setRange (range) {
      this.range = range
    },
    apply (values) {
      this.max = values.max
      this.min = values.min
      this.average = values.ave
    }
  }
}
</script>

<style scoped>
.buttons {
  text-align: center;
}
</style>
