<template>
    <div>
        {{ qNo }}. <span>{{ question.question }}</span>
        <div v-for="(option, index) in question.options" v-bind:key="index">
            {{ index + 1 }}. 
            <input type="radio" 
                name="answer" 
                :value='option.option'
                v-model="answer">  {{ option.option }}
        </div>
        {{ answer }}
    </div>
</template>

<script>
export default {
    props: [
        'question',
        'qNo'
    ],
    data(){
        return {
            answer: ''
        }
    }
}
</script>

