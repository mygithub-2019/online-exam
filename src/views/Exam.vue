<template>
    <div>
        <h1> Exam started <sub>Time left: {{  }}</sub></h1>
        <hr>
        Question No: {{ questionNo }}
        <div v-for="(qton, index) in getQuestions" v-bind:key="index">
            <app-question-tempate :question='qton' :qNo="questionNo"></app-question-tempate>
        </div><br>
        <div>
            <button class="btn btn-primary float-center"
                :disabled='questionNo == 1'
                @click="previousQuestion"
            >Previous</button> &nbsp; &nbsp;
            <button class="btn btn-primary float-center"
                :disabled='questionNo == 10'
                @click="nextQuestion"    
            >Next</button> &nbsp; &nbsp;
            <button class="btn btn-primary float-center"
                v-show='questionNo == 10'   
            >SUBMIT</button>
        </div>
    </div>
</template>

<script>
import QuestionTempate from './QuestionTemplate.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data(){
        return {
            timeLeft: ''
        }
    },
    computed: {
        ...mapState([
            'questionNo'
        ]),
        ...mapGetters([
            'getQuestions'
        ])
    },
    components: {
        appQuestionTempate: QuestionTempate
    },
    methods:{
        ...mapMutations([
            'PREVIOUS_QUESTION',
            'NEXT_QUESTION'
        ]),
        ...mapActions([

        ]),
        previousQuestion() {
            this.PREVIOUS_QUESTION()
        },
        nextQuestion() {
            this.NEXT_QUESTION(mapState.questionNo)
        }
    },
    created() {

    }
}
</script>
