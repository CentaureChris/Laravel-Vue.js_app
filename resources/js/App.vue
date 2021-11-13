<template>
    <div>
        <Navbar />
        <router-view />
       
    </div>
</template>

<script>
import Navbar from './components/Navbar';


export default {
    name:'app',
    components: {
        Navbar,
    },
    mounted:  
    function() {
        // Appeler une action du store
        // this.$store.dispatch("readObject",{path: this.url + '/api/getClients'})
	},
}
</script>