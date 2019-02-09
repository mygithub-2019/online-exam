import Vue from 'vue'
import Vuex from 'vuex'

import questions from './modal/questionsDB.json'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionNo: 0,
    questions: questions,
    isExamStarted: false,
    isExamEnd: false
  },
  getters: {
    getQuestionByNo(state){
      return questions[state.questionNo]
    }
},
  mutations: {
    START_EXAM: (state, payload) => {
      state.isExamStarted = payload
    },
    END_EXAM: (state, payload) => {
      state.isExamEnd = payload
    },
    PREVIOUS_QUESTION: (state, payload) => {
      if(state.questionNo > 0){
        state.questionNo --
      }
      //this.questions[state.questionNo]
    },
    NEXT_QUESTION: (state, payload) => {
      if(state.questionNo < 10){
        state.questionNo ++
      }
      //getQuestions(getters.questionNo)
      //this.getQuestionByNo(state.questionNo)
    }
  },
  actions: {
    getQuestionByNo: ({commit, getters}, payload) => {
      commit('NEXT_QUESTION', payload)
    }
  }
})
