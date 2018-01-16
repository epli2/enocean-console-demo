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

function pushSort (array, data) {
  array.push(data)
  array.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp)
  })
}

const mutations = {
  switchDemoMode () {
    state.isDemoMode = !state.isDemoMode
  },
  pushData (state, { data, dataType }) {
    switch (dataType) {
      case 'temp':
        pushSort(state.tempArray, data)
        break
      case 'humid':
        pushSort(state.humidArray, data)
        break
      case 'illum':
        pushSort(state.illumArray, data)
        break
      case 'audio':
        pushSort(state.audioArray, data)
        break
      case 'demo-temp':
        pushSort(state.demoTempArray, data)
        break
      case 'demo-humid':
        pushSort(state.demoHumidArray, data)
        break
      case 'demo-illum':
        pushSort(state.demoIllumArray, data)
        break
      case 'demo-audio':
        pushSort(state.demoAudioArray, data)
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
