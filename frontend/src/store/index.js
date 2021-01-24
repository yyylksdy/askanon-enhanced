// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
const windowURL = window.location.href
const index = windowURL.indexOf(window.location.hostname)
const url = windowURL.slice(0, index + window.location.hostname.length)

Vue.use(Vuex)
// to handle state
const state = {
  queries: []
}

// to handle state
const getters = {
  getQueries: state => {
    return state.queries
  }
}

// to handle actions
const actions = {
  getAllQueries ({ commit }) {
    axios
      .get(url + ':3000/query/get')
      .then(response => commit('SET_QUERIES', response.data))
      .catch(err => {
        console.log('Error:', err)
      })
  },
  postQuery ({commit}, {question, myid}) {
    axios
      .post(url + ':3000/query/add', {
        question,
        myid
      })
      .then(response => {
        commit('POST_QUERY', {question, myid})
        console.log(response.data)
      })
      .catch(err => {
        console.log('Error:', err)
      })
  },
  postAnswer ({commit}, {answer, myid}) {
    axios
      .post(url + ':3000/query/answer/' + myid, {
        answer,
        myid
      })
      .then(response => {
        commit('POST_ANSWER', {answer, myid})
        console.log(response.data)
      })
      .catch(err => {
        console.log('Error:', err)
      })
  }
}

// to handle mutations
const mutations = {
  SET_QUERIES (state, queries) {
    state.queries = queries
  },
  POST_QUERY: (state, query) => {
    state.queries.push({...query, answers: []})
  },
  POST_ANSWER: (state, query) => {
    const item = state.queries.find(item => item.myid === query.myid)
    item.answers.push(query.answer)
  }
}

// export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
