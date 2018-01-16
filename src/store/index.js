import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isDemoMode: true,
  tempArray: [],
  humidArray: [],
  illumArray: [],
  audioArray: [],
  demoTempArray: [],
  demoHumidArray: [],
  demoIllumArray: [],
  demoAudioArray: []
}

const mutations = {
  switchDemoMode () {
    state.isDemoMode = !state.isDemoMode
  },
  pushData (state, { data, dataType }) {
    switch (dataType) {
      case 'temp':
        state.tempArray.push(data)
        break
      case 'humid':
        state.humidArray.push(data)
        break
      case 'illum':
        state.illumArray.push(data)
        break
      case 'audio':
        state.audioArray.push(data)
        break
      case 'demo-temp':
        state.demoTempArray.push(data)
        break
      case 'demo-humid':
        state.demoHumidArray.push(data)
        break
      case 'demo-illum':
        state.demoIllumArray.push(data)
        break
      case 'demo-audio':
        state.demoAudioArray.push(data)
        break
    }
  }
}

const actions = {
  switchDemoMode: ({ commit }) => commit('switchDemoMode'),
  pushData: ({ commit }, { data, dataType }) => {
    commit('pushData', {
      data: data,
      dataType: dataType
    })
  }
}

const getters = {
  tempArray: () => state.isDemoMode ? state.demoTempArray : state.tempArray,
  humidArray: () => state.isDemoMode ? state.demoHumidArray : state.humidArray,
  illumArray: () => state.isDemoMode ? state.demoIllumArray : state.illumArray,
  audioArray: () => state.isDemoMode ? state.demoAudioArray : state.audioArray
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
