<template>
    <div>
        <div class="jumbotron float-center" v-show="!isExamEnd">
            <app-progress-bar class="col-lg-12" :pbWidth='pbWidth'></app-progress-bar><br>
            <table>
                <tr><b>{{questionNo + 1}}. <span>{{ question.question }}</span></b></tr>
            </table><br>
        <!-- <div v-for="(option, index) in question.options" v-bind:key="index">
            {{ index + 1 }}. 
            <input 
                type="radio" 
                name="answer" 
                :value='option.option'
                v-model="answer"
                >  {{ option.option }}
        </div> -->
        <!-- <div class="form-check" > -->
            <!-- <span style="width: 20px">{{ index + 1 }}.</span>  -->
            <table>
                <!-- <tr><p>{{questionNo + 1}}. <span>{{ question.question }}</span></p></tr> -->
                <tr class="form-check col-lg-12" v-for="(option, index) in question.options" v-bind:key="index">
                    <td><label class="form-check-label"></label></td>
                    <td><input 
                    type="radio" 
                    class="form-check-input" 
                    name="answer" 
                    :value='option'
                    v-model="question.answer"
                    @click="ansSelected(question, option)"
                    >{{ option }}</td>
                </tr>
            </table>
            <!-- <label class="form-check-label"></label>
                <input 
                    type="radio" 
                    class="form-check-input" 
                    name="answer" 
                    :value='option.option'
                    v-model="answer"
                    checked>{{ option.option }} -->
            
        <!-- </div> -->
        </div>
        <br>
        <div>
            <button class="btn btn-primary float-center"
                :disabled='questionNo == 0'
                @click="previousQuestion"
            >Previous</button> &nbsp; &nbsp;
            <button class="btn btn-primary float-center"
                :disabled='questionNo == 9'
                @click="nextQuestion"    
            >Next</button> &nbsp; &nbsp;

            <button class="btn btn-primary float-center"
                v-show='questionNo == 9' 
                @click="reviewAnswers"  
            >Review Answers</button>
            <!-- <button class="btn btn-primary float-center"
                v-show='questionNo == 9' 
                @click="submitTest"  
            >SUBMIT</button> -->
        </div>
        <br>
        <div v-show="isReviewAnswers">
            <h1>Your answers...!</h1>
            <table>
                <thead>
                    <th>Question</th>
                    <th>Answer</th>
                </thead>
                <tbody>
                    <tr v-for="(ans, index) of allAnswers" v-bind:key="index">
                        <td>Qtn {{ index + 1}}</td>
                        <td>{{ ans.answer }}</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary float-center"
                v-show='questionNo == 9' 
                @click="submitTest"  
            >SUBMIT</button>
        </div>
    </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { throws } from 'assert';

export default {
    computed: {
        ...mapState([
            'questionNo',
            'questions',
            'isExamEnd'
        ]),
        ...mapGetters([
            'getQuestionByNo',
            'getPB'
        ])
    },
    props: [
        'question'
    ],
    data(){
        return {
            answer: '',
            allAnswers: [],
            isReviewAnswers: false,
            pbWidth: 0
            //isExamEnd: false
            //isPrevQuestion: false
        }
    },
    components: {
        appProgressBar: ProgressBar
    },
    methods: {
        ...mapMutations([
            'PREVIOUS_QUESTION',
            'NEXT_QUESTION',
            'END_EXAM',
            'IS_USER_AUTHENTICATED'
        ]),
        ...mapActions([
            
        ]),
        reviewAnswers(){
            this.addAnswer({
                "id": this.questionNo,
                "answer": this.answer
            })
            this.isReviewAnswers = true;
        },
        previousQuestion() {
            this.PREVIOUS_QUESTION()
            //this.getQuestionByNo()
            //this.isPrevQuestion = !this.isPrevQuestion
        },
        nextQuestion() {
            // let _data = {
            //     "id": this.questionNo,
            //     "answer": this.answer
            // }
               this.NEXT_QUESTION(mapState.questionNo)
            // this.addAnswer(_data)
        },
        addAnswer(data){
            if(this.allAnswers.length == 0){
                this.allAnswers.push(data)
                return
            }
            if(this.allAnswers.length){
                let _found = false
                for(let i = 0; i < this.allAnswers.length; i++){
                    if(this.allAnswers[i].id == data.id){
                        _found = true
                        this.allAnswers[i].answer = (data.answer != '') ? data.answer : this.allAnswers[i].answer 
                        data.answer = ''
                    }else{
                        continue
                    }
                }
                if(!_found){
                    this.allAnswers.push(data)
                }
            }
            this.answer = ""
        },
        updateAnswer(data){
            for(let i = 0; i <= this.allAnswers.length; i++){
                if(this.allAnswers[i] == data.id){
                   this.allAnswers[i].answer = data.answer 
                }
            }
        },
        submitTest(){
            this.addAnswer({
                "id": this.questionNo,
                "answer": this.answer
            })
            console.log(this.allAnswers)
            this.END_EXAM('ture')
            this.IS_USER_AUTHENTICATED('false')
            this.$router.go(-1)
            window.location.reload()
        },
        ansSelected(_qtn, _ans){
            this.pbWidth = this.$store.getters.getPB
            // let _data = {
            //     "id": this.questionNo,
            //     "answer": this.answer
            // }
            _qtn.answer = _ans
            this.addAnswer(_qtn)
            //console.log(this.question.answer)
        }
    },
    beforeRouteLeave() {
        //this.startTimerCount(false)
    }
}
</script>

