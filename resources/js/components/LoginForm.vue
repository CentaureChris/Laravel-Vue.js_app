<template>
    <div class="container col-6 mt-5 border p-3">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Login/Email address:</label>
                <input type="email" v-model="formData.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email or login">
                <p class="text-danger" v-text="errors.password"></p>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label" placeholder="Enter yout password" >Password:</label>
                <input type="password"  v-model="formData.password" class="form-control" id="exampleInputPassword1">
                <p class="text-danger" v-text="errors.email"></p>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="login()" >Submit</button>
            <div class=" text-end">
                <router-link to="/register">Create New account</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "LoginForm",
        data(){
            return{
                formData: {
                    email:"",
                    password:"",
                    device_name:"browser"
                },
            url: document.head.querySelector("meta[name='url']").content,
            errors: {},
            isLogging: false,
            };
        },
        methods: {
            login(){
                let url = this.url + "/api/login";
                // eslint-disable-next-line no-undef
                axios.post(url, this.formData).then((response) => {
                        localStorage.setItem("token",response.data);
                        this.$router.push({name:"ClientsView"});
                        window.location.reload();
                    }).catch((errors) => {
                        this.errors = errors.response.data.errors;
                    });
                // }
                // this.$store.dispatch("login",{
                //     path:this.url + '/api/login',
                //     content:this.formData
                // })
            }
        }
    };
</script>