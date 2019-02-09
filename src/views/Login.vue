<template>
  <div class="login">
    <!-- <HelloWorld msg="Test"/> -->
    <div class="container col-lg-6">
      <h2>Login</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" class="form-control" id="pwd">
            </div>
            <div class="form-group form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember me
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'login',
  computed: {
    ...mapState([
      'isExamStarted'
    ])
  },
  data() {
    return {
      email: '',
      pwd: '',
      users: []
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    ...mapMutations([
      'START_EXAM'
    ]),
    login(){
      this.START_EXAM('ture')
      this.$router.push('/exam')
    },
    getAllUsers(){
      axios.get('https://online-exam-1652f.firebaseio.com/user.json').then(res => {
        //console.log(res)
        this.users = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.getAllUsers()
  }
}
</script>
