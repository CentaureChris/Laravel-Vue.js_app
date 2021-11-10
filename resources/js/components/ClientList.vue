<template>
    <div class="container">
        <h2>Client Page</h2>
        <div class="text-end">
            <button class="btn btn-info">
                <router-link class="nav-link" to="clients/addClient">AddClients</router-link>
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tel</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Code Postal</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Commentaire</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody v-for="client in clients" :key="client.id">
                <tr>
                    <th scope="row">{{ client.id }}</th>
                    <td>{{ client.firstname }}</td>
                    <td>{{ client.lastname }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.tel}}</td>
                    <td>{{ client.adresse}}</td>
                    <td>{{ client.codePostal }}</td>
                    <td>{{ client.ville }}</td>
                    <td>{{ client.commentaire }}</td>
                    <td>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Update</button>
                        <button class="btn btn-warning" @click="deleteClient(client.id)">Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <form>
            <div v-for="client in clients" :key="client.id" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
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
                                <input type="tel" v-model="editTel" class="form-control">
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
                                <input type="text-area" v-model="editCommentaire" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" @click.prevent="editClient(client.id)" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        name: 'Client',
        created() {
            this.loadData();
        },
        methods: {
            mounted() {
                this.getResults();
            },
            loadData() {
                let url = this.url + '/api/getClients';
                this.axios.get(url).then(response => {
                    this.clients = response.data
                    // console.log(this.clients)
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
                    alert(id);
                },
            getResults(page = 1){
                let url = this.url + '/api/getClients';
                axios.get(url)
                .then(response => {
                    // console.log(response.data); 
                    this.clients = response.data;
                    });
                }
        },
     
        data() {
            return {
                url: document.head.querySelector('meta[name="url"]').content,
                clients: [],
                editFirstname:'',
                editLastname:'',
                editEmail:'',
                editTel:'',
                editAdresse:'',
                editCodePostal:'',
                editVille:'',
                editCommentaire:'',
            }
        }
    }

        
</script>