<template>
    <div class="container col-6 mt-5 border p-3">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Login</label>
                <input type="text" v-model="formData.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email or login">
                <p class="text-danger"></p>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address:</label>
                <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email or login">
                <p class="text-danger" v-text="errors.password"></p>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label" placeholder="Enter yout password" >Password:</label>
                <input type="password"  v-model="formData.password" class="form-control" id="exampleInputPassword1">
                <p class="text-danger" v-text="errors.email"></p>
            </div>
             <div class="mb-3">
                <label for="exampleInputPassword2" class="form-label" placeholder="Confirm yout password" >Confirm Password:</label>
                <input type="password"  v-model="formData.confirmPassword" class="form-control" id="exampleInputPassword2">
                <p class="text-danger" v-text="errors.email"></p>
            </div>
            <button type="submit" class="btn btn-primary" @click="register()">Register</button>
            <div class=" text-end">
                <router-link to="/login">Already have an account</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        data(){
            return{
                formData: {
                    name:"",
                    email:"",
                    password:"",
                    confirmPassword:"",
                },
                url: document.head.querySelector('meta[name="url"]').content,
                errors: {},
                isLogging: false,
                }
            },
        methods: {
            register(){
            let url = this.url + '/api/register';
            axios.post(url, this.formData).then((response) => {
                this.$router.push({name:"LoginView"});
                }).catch((errors) => {
                    this.errors = errors.response.data.errors
                })
            }
        }
    }
</script>