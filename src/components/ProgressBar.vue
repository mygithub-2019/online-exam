<template>
    <div>
        <div class="progress">
            <!-- <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-valuemin="0" 
            aria-valuemax="100" :style="{width: progressBarWidth + '%'}">{{ getProgressBarWidth() + '%'}}</div> -->
        <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-valuemin="0" 
            aria-valuemax="100" :style="{width: pbWidth + '%'}"><strong>{{ pbWidth + '%'}}</strong></div>
        </div>
        <!-- {{ progressBarWidth }} -->
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
    props: ([
        'pbWidth'
    ]),
    data(){
        return {
            progressBarWidth: 10
        }
    },
    computed: {
        ...mapGetters([
            'getPB'
        ])
    },
    methods: {
        getProgressBarWidth(){
           this.progressBarWidth = this.getPB
           return this.progressBarWidth
        }
    }
}
</script>

