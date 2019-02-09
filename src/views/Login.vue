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
              <input type="email" class="form-control" 
              id="email"
              v-model="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" class="form-control" 
              id="pwd"
              v-model="pwd">
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
      'isExamStarted',
      'isUserAuthenticated'
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
      'START_EXAM',
      'IS_USER_AUTHENTICATED'
    ]),
    login(){
      let _userData = {
        email: this.email,
        pwd: btoa(this.pwd)
      }
      //this.getAllUsers()
      this.checkUser(_userData)
    },
    getAllUsers(){
      axios.get('https://online-exam-1652f.firebaseio.com/user.json').then(res => {
        this.users = res.data
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkUser(loggedUserInfo){
      let _users = []
      for(var user in this.users){
        _users.push(this.users[user])
      }
      _users.find(_user => {
        if(_user.email == loggedUserInfo.email && _user.pwd == loggedUserInfo.pwd){
          this.IS_USER_AUTHENTICATED('ture')
        }
      })
      if(this.isUserAuthenticated){
        this.$router.push('/exam')
      }else{
          alert('User not found...!');
      }
    }
  },
  created(){
    this.getAllUsers()
  }
}
</script>
