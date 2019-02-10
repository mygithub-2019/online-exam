<template>
    <div>
        <h3> Exam started</h3> <h5>Duration: 30min</h5>
            <!-- <sub>Time left: <span class="demo" :timer='startTimerCount()'><span id='demo'>&nbsp;</span></span></sub> -->
        
        
        <!-- Question No: {{ questionNo }} {{ qtn = questions[questionNo - 1] }} <br> -->
        <!-- {{getQuestionByNo}} -->
        <!-- <div v-for="(qton, index) in getQuestions" v-bind:key="index">
            <app-question-tempate :question='qton' :qNo="questionNo"></app-question-tempate>
        </div><br> -->
        <app-question-tempate :question='getQuestionByNo'></app-question-tempate>
        <br>
        <div>
            <!-- <button class="btn btn-primary float-center"
                :disabled='questionNo == 0'
                @click="previousQuestion"
            >Previous</button> &nbsp; &nbsp;
            <button class="btn btn-primary float-center"
                :disabled='questionNo == 9'
                @click="nextQuestion"    
            >Next</button> &nbsp; &nbsp;
            <button class="btn btn-primary float-center"
                v-show='questionNo == 9'   
            >SUBMIT</button> -->
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
            'isUserAuthenticated'
        ]),
        ...mapGetters([
            'getQuestionByNo'
        ])
    },
    components: {
        appQuestionTempate: QuestionTempate
    },
    methods:{
        // ...mapMutations([
        //     'PREVIOUS_QUESTION',
        //     'NEXT_QUESTION'
        // ]),
        // ...mapActions([
            
        // ]),
        // previousQuestion() {
        //     this.PREVIOUS_QUESTION()
        // },
        // nextQuestion() {
        //     this.NEXT_QUESTION(mapState.questionNo)
        // },
        startTimerCount(start){
            if(!start){
                clearInterval(x);
            }
            var countDownDate = new Date(Date.now() + (30 * 60 * 1000));
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("demo").innerHTML =  minutes + "m " + seconds + "s ";
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("demo").innerHTML = "EXPIRED";
                }
            }, 1000);
        }
    },
    beforeRouteEnter(to, from, next ) {
        next() 
    },
    beforeRouteLeave (to, from, next) {
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
            next()
            window.location.reload()
        } else {
            next(false)
        }
    } 
}
</script>
<style lang="scss" scoped>
.demo{
    color: red
}
</style>
