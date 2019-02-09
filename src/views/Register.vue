<template>
  <div class="register">
    <div class="container col-lg-6">
      <h2>{{ title }}</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="registerNewUser">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email"
                v-model="email">
            </div>
            <div class="form-group">
              <label for="pwd">Password</label>
              <input type="password" class="form-control" id="pwd"
                v-model="pwd">
            </div>
            <div class="form-group">
              <label for="cpwd">Confirm Password</label>
              <input type="password" class="form-control" id="cpwd"
                v-model="cpwd">
            </div>
            <button 
              type="submit" 
              class="btn btn-primary"
              >Register</button>
          </form>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import Router from 'vue-router'
import axios from 'axios'

export default {
  data() {
    return { 
      title: 'Register New User',
      email:'',
      pwd: '',
      cpwd: ''
    }
  },
  methods: {
    registerNewUser(){
      var userData = {
        email: this.email,
        pwd: btoa(this.pwd),
        cpwd: btoa(this.cpwd)
      }
      axios.post('https://online-exam-1652f.firebaseio.com/user.json', userData)
        .then(res => {
          this.resetUserFormData()
          this.$router.push('/')
          console.log(res)
        })
        .catch(error => console.log(error))
    },
    resetUserFormData(){
      this.email = ''
      this.pwd = ''
      this.cpwd = ''
    }
  }
}
</script>
