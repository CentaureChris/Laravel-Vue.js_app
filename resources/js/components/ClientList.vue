<template>
    <div class="m-3" v-if="Logged()">
        <h2>Client Page</h2>
        <div class="text-end">
            <button class="btn btn-info">
                <router-link class="nav-link" to="clients/addClient">AddClients</router-link>
            </button>
        </div>
        <table class="table w-100">
            <thead>
                <tr class="text-center">
                    <th scope="col">id</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">C.Postal</th>
                    <th scope="col">Ville</th>
                    <th scope="col" >Commentaire</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="client in clients" :key="client.id">
                    <th scope="row">{{ client.id }}</th>
                    <td>{{ client.firstname }}</td>
                    <td>{{ client.lastname }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.tel}}</td>
                    <td>
                        <p>
                            {{ client.adresse}}
                        </p>
                    </td>
                    <td>{{ client.codePostal }}</td>
                    <td>{{ client.ville }}</td>
                    <textarea v-model="client.commentaire" style="box-sizing: border-box;" disabled></textarea>
                    <td>
                        <div class="row d-flex justify-content-center">
                            <button type="button" class="btn btn-primary m-1 col-6" style="width:90%;" @click="editClient(client.id)" data-bs-toggle="modal" :data-bs-target="'#modal'+client.id">Update</button>
                            <button class="btn btn-warning m-1 col-6" style="width:90%;" @click="deleteClient(client.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <form>
            <div v-for="client in clients" :key="client.id" class="modal fade" :id="'modal'+client.id" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Client Form</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Lastname</label>
                                <input type="text" v-model="editFirstname" class="form-control"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Firstname</label>
                                <input type="text" v-model="editLastname" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                <input type="email" v-model="editEmail" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Tel</label>
                                <input type="tel" v-model="editTel" class="form-control" maxlength="10">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Adresse</label>
                                <input type="text" v-model="editAdresse" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Code Postal</label>
                                <input type="text" v-model="editCodePostal" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Ville</label>
                                <input type="text" v-model="editVille" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Commentaire</label>
                                <textarea type="text-area" v-model="editCommentaire" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit"  class="btn btn-primary" @click="updateClient()" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
    td{
        position: relative
    }
    textarea {
        resize: none; 
        border-left: none;
        border-right: none;
        border-bottom: none;
        border-top: 1px solid lightgrey;

    }
</style>

<script>
    export default {
        name: "Client",
        data() {
            return {
                user: [], 
                url: document.head.querySelector('meta[name="url"]').content,
                clients: [],
                id:"",
                editFirstname:'',
                editLastname:'',
                editEmail:'',
                editTel:'',
                editAdresse:'',
                editCodePostal:'',
                editVille:'',
                editCommentaire:'',
                firstname:'',
                lastname:'',
                email:'',
                tel:'',
                adresse:'',
                codePostal:'',
                ville:'',
                commentaire:'',
            }
        },
        created() {
            this.loadData();

        },
        methods: {
            mounted() {
                this.getResults()
                // this.deleteClient()
            },
            loadData() {
                let url = this.url + '/api/getClients';
                this.axios.get(url).then(response => {
                    this.clients = response.data
                    let token = localStorage.getItem('token')
                    this.users = {...this.user,token}
                    console.log(this.user)
                });
            },
            deleteClient(id){
                if(!confirm("Are you sure to delete")){
                    return false
                    };
                let url = this.url + '/api/delete_client';
                axios.delete( url+'/' + id )
                .then(response => this.getResults());
            },
            editClient(id) {
            this.getResults();
                let url = this.url + '/api/edit_client';
                axios.get(url+"/"+id)
                .then(response => {
                    this.id = response.data.id;
                    this.editLastname = response.data.lastname;
                    this.editFirstname = response.data.firstname;
                    this.editEmail = response.data.email;
                    this.editTel = response.data.tel;
                    this.editAdresse = response.data.adresse;
                    this.editCodePostal = response.data.codePostal;
                    this.editVille = response.data.ville;
                    this.editCommentaire = response.data.commentaire;
                });
            },
            updateClient(){
                let url = this.url + '/api/update_client';
                axios.put(url,{
                    id: this.id,
                    lastname: this.editLastname,
                    firstname: this.editFirstname,
                    email: this.editEmail,
                    tel: this.editTel,
                    adresse: this.editAdresse,
                    codePostal: this.editCodePostal,
                    ville: this.editVille,
                    commentaire: this.editCommentaire,
                })
                .then(response => console.log(response));
            },
            getResults(page = 1){
                let url = this.url + '/api/getClients';
                axios.get(url)
                .then(response => {
                    console.log(response.data); 
                    this.clients = response.data;
                });
            },
           Logged(){
               if(localStorage.getItem('token')){
                   return true
               }else{
                   alert('You must be logged to acces!')
                   this.$router.push('/login');
               }
           }
         
            // getUsers(){
            //     let url = this.url + '/api/getUsers';
            //     this.axios.get(url).then(response => {
            //         this.users = response.data
            //         console.log(this.users)
            //     });
            // }
        },
    }

        
</script>