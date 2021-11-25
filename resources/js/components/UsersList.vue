<template>
    <div class="m-3 container" v-if="Logged()">
        <h2>User Page</h2>
      
        <table class="table">
            <thead>
                <tr class="text-center">
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="user in users" :key="user.id" class="text-center">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password}}</td>
                    <td>
                        <div class="row d-flex justify-content-center">
                            <button type="button" class="btn btn-primary m-1 col-6" style="width:90%;" @click="editUser(user.id)" data-bs-toggle="modal" :data-bs-target="'#modal'+user.id">Update</button>
                            <button  class="btn btn-warning m-1 col-6" style="width:90%;" @click="deleteUser(user.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <form>
            <div v-for="user in users" :key="user.id" class="modal fade" :id="'modal'+user.id" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit user Form</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Name</label>
                                <input type="text" v-model="editName" class="form-control"
                                    aria-describedby="emailHelp">
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Email</label>
                                <input type="email" v-model="editEmail" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit"  class="btn btn-primary" @click="updateUser()" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "UserView",
        data() {
            return {
                users: [],
                url: document.head.querySelector('meta[name="url"]').content,
                id:"",
                name:"",
                email:"",
                password:"",
                editName:"",
                editEmail:"",
                editPassword:"",
            }
        },
        created() {
           this.loadData()
        },
        methods: {
            mounted() {
                this.getResults(),
                this.deleteUser()             
            },
            computed(){
                this.getResults()
                this.deleteUser()
            },

            loadData() {
                let url = this.url + '/api/getUsers';
                this.axios.get(url).then(response => {
                    this.users = response.data
                    console.log(this.users)
                });
            },

             editUser(id) {
            this.getResults();
                let url = this.url + '/api/edit_user';
                axios.get(url+"/"+id)
                .then(response => {
                    this.id = response.data.id;
                    this.editName = response.data.name;
                    this.editEmail = response.data.email;
                    this.editPassword = response.data.password
                    console.log(response);
                });
            },

            updateUser(){
                let url = this.url + '/api/update_user';
                axios.put(url,{
                    id: this.id,
                    name: this.editName,
                    email: this.editEmail,
                    password: this.editPassword,
                    
                })
                .then(response => console.log(response));
            },

            deleteUser(id){
                if(!confirm(`Delete user with id ${id}`)){
                    return false;
                };
                let url = this.url + '/api/delete_user';
                axios.delete( url+'/' + id )
                .then(response => this.getResults());
            },

            getResults(page = 1){
                let url = this.url + '/api/getUsers';
                axios.get(url)
                .then(response => {
                    console.log(response.data); 
                    this.users = response.data;
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
        },
    }

        
</script>