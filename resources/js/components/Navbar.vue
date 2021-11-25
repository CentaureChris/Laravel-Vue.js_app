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
        <li v-if="isLogged()" class="nav-item">
          <router-link class="nav-link d-inline-block " to="/clients">Client List</router-link>
          <router-link class="nav-link d-inline-block" to="/user">User List</router-link>
        </li>
      </ul>
     

       <div v-if="isLogged()">
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
    
    }
  },
  mounted() {
    this.isLogged();
  },
  methods: {
    isLogged(){
      if(localStorage.getItem('token')){
        return true;
      }else{
        return false
      }
    },
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/login')
      window.location.reload();
    }
  }
}

</script>
