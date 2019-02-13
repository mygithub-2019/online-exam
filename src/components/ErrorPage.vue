<template>
    <div>
        <div class="alert alert-danger alert-dismissible fade show"
            v-if="userNotFound">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>User not found!</strong> Please register to login.
        </div>
    </div>
</template>

<script>
export default {
    props: ([
        
    ]),
    data(){
        return {

        }
    }
}
</script>

