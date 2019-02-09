import Vue from 'vue'
import Vuex from 'vuex'

import questions from './modal/questionsDB.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isExamStarted: false,
    questionNo: 1
  },
  getters: {
    getQuestions(){
      return questions
    }
  },
  mutations: {
    START_EXAM: (state, payload) => {
      state.isExamStarted = payload
    },
    PREVIOUS_QUESTION: (state, payload) => {
      if(state.questionNo > 1){
        state.questionNo --
      }
    },
    NEXT_QUESTION: (state, payload) => {
      if(state.questionNo < 10){
        state.questionNo ++
      }
    }
  },
  actions: {
    getQuestionByNo: (context, payload) => {
      context.commit('NEXT_QUESTION', payload)
    }
  }
})
