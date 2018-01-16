import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tempArray: [],
  humidArray: [],
  illumArray: [],
  audioArray: []
}

const mutations = {
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
    }
  }
}

const actions = {
  pushData: ({ commit }, { data, dataType }) => {
    commit('pushData', {
      data: data,
      dataType: dataType
    })
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
