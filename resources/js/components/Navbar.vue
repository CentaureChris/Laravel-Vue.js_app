<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/clients">Clients</router-link>
        </li>
      </ul>
     

       <div v-if="logged">
          <button class="nav-link" @click="logout()">Logout</button>
       </div>
       <div v-else>
          <button><router-link class="nav-link" to="/login">Login</router-link></button>
       </div>

     
    </div>
  </div>
</nav> 
</template>

<script>
export default {
  name:'Navbar',
  data(){
    return{
      logged: false,
    }
  },
  mounted() {
    this.isLogged();
  },
  methods: {
    isLogged(){
      if(localStorage.getItem('token')){
        this.logged = true
      }else{
        this.logged = false
      }
    },
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}

</script>
