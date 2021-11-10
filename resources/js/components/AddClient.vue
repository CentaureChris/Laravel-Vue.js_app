<template>
    <div class="container">
        <h2>Client add form</h2>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Lastname</label>
                <input type="text" v-model="firstname" class="form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Firstname</label>
                <input type="text" v-model="lastname" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Tel</label>
                <input type="tel" v-model="tel" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Adresse</label>
                <input type="text" v-model="adresse" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Code Postal</label>
                <input type="text" v-model="codePostal" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Ville</label>
                <input type="text" v-model="ville" class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Commentaire</label>
                <input type="text-area" v-model="commentaire" class="form-control" >
            </div>
            <button type="submit" @click="saveClient" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name:'AddClient',
    data() {
            return {
                firstname:'',
                lastname:'',
                email:'',
                tel:'',
                adresse:'',
                codePostal:'',
                ville:'',
                commentaire:'',

                url: document.head.querySelector('meta[name="url"]').content,

                }
            },
     mounted() {
            console.log('Component mounted')
            },
    methods: {
      
        saveClient(){
            let url = this.url + '/api/save_client';
            axios.post(url,{
                firstname : this.firstname,
                lastname : this.lastname,
                email : this.email,
                tel : this.tel,
                adresse : this.adresse,
                codePostal : this.codePostal,
                ville : this.ville,
                commentaire: this.commentaire,
                })
                this.$router.push('/clients') 
            },
         
        },
    
    }
    
</script>