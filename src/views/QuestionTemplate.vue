<template>
    <div>
        <span>{{ question.question }}</span><br>
        <div v-for="(option, index) in question.options" v-bind:key="index">
            {{ index + 1 }}. 
            <input type="radio" 
                name="answer" 
                :value='option.option'
                v-model="answer"
                @change="answerSelected">  {{ option.option }}
        </div>
        <!-- {{ allAnswers }} -->
    </div>
</template>

<script>
export default {
    props: [
        'question'
    ],
    data(){
        return {
            answer: ''
            // allAnswers: []
        }
    },
    methods: {
        answerSelected(){
            
            //this.allAnswers.push({})
        }
    }
}
</script>

