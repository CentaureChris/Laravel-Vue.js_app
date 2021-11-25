<template>
    <div class="container">
        <h2>Home form contact</h2>
        <form>
            <div class="row">

                 <div class="mb-3 col-6">
                    <label for="exampleInputEmail1" class="form-label">Firstname</label>
                    <input type="text" v-model="firstname" class="form-control"  aria-describedby="emailHelp">
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleInputPassword1" class="form-label">Lastname</label>
                    <input type="text" v-model="lastname" class="form-control" >
                </div>
            </div>
           
           <div class="row">
               <div class="mb-3 col-6">
                    <label for="exampleInputPassword1" class="form-label">Email</label>
                    <input type="email" v-model="email" class="form-control" required>
                </div>
                <div class="mb-3 col-6">
                    <label for="exampleInputPassword1" class="form-label">Tel</label>
                    <input type="tel" v-model="tel" class="form-control" maxlength="10" required>
                </div>
           </div>

           <div class="row">
                  <div class="mb-3 col-6" id="app-autocomplete-here">
                <label for="exampleInputPassword1" class="form-label">Adresse</label>
                <input id="autocomplete" type="text" v-model="adresse" class="form-control" placeholder="Origin" ref="origin">
            </div>
            <div class="mb-3 col-3">
                <label for="exampleInputPassword1" class="form-label">Code Postal</label>
                <input type="text" v-model="codePostal" class="form-control" >
            </div>
            <div class="mb-3 col-3">
                <label for="exampleInputPassword1" class="form-label">Ville</label>
                <input type="text" v-model="ville" class="form-control" >
            </div>
           </div>
            
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Commentaire</label>
                <textarea type="text-area" v-model="commentaire" class="form-control" ></textarea>
            </div>

            
            <button type="submit" @click.prevent="saveClient" class="btn btn-primary ml-3-">Submit</button>
        </form>

        <br/>
        <div v-if="this.id||this.lastname||this.firstname" class="card" style="width: 36rem;">
            <div class="card-body">
                <h5 class="card-title">{{ firstname }} {{ lastname }}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ email }}</li>
                <li class="list-group-item">{{ tel }}</li>
                <li class="list-group-item">{{ adresse }}<br>{{ codePostal }}, {{ ville }}</li>
            </ul>
            <div class="card-body" style="text-align: center;">
                <textarea v-model="commentaire" disabled></textarea>
            </div>
        </div>
        <!-- <div class="w-100 border p-2"> 
            <div class="row">
                <div class="col-6">
                    <p>{{ firstname }}</p>
                    <p>{{ lastname }}</p>
                    <p>{{ email }}</p>
                    <p>{{ tel }}</p>
                </div>
                <div class="col-6">
                    <p>{{ adresse }}</p>
                    <p>{{ codePostal }}</p>
                    <p>{{ ville }}</p>
                </div>
                <div style="text-align: center; width ">
                    <textarea v-model="commentaire" disabled></textarea>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>

export default {
    name:'Home',
    data(){
        return {
            id:"",
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
       
        const autocomplete = new google.maps.places.Autocomplete(this.$refs["origin"]);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            // console.log(place.address_components);
            this.adresse = place.address_components[0].long_name+" "+place.address_components[1].long_name;
            this.ville = place.address_components[2].long_name;
            this.codePostal = place.address_components[6].long_name
        },)
        $('form input').keydown(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });
    },
    methods: {
        saveClient(){
            let url = this.url + '/api/save_client';
                if(!confirm("Do u really want to save yours data ?")){
                    return false
                };
                if(this.id){
                    let updateUrl = this.url + '/api/update_client';
                    axios.put(updateUrl,{
                        id: this.id,
                        firstname : this.firstname,
                        lastname : this.lastname,
                        email : this.email,
                        tel : this.tel,
                        adresse : this.adresse,
                        codePostal : this.codePostal,
                        ville : this.ville,
                        commentaire: this.commentaire,
                    })
                    .then(response => console.log(response));
                }else{
                axios.post(url,{
                    id: this.id,
                    firstname : this.firstname,
                    lastname : this.lastname,
                    email : this.email,
                    tel : this.tel,
                    adresse : this.adresse,
                    codePostal : this.codePostal,
                    ville : this.ville,
                    commentaire: this.commentaire,
                })
                .then(response => {
                    // console.log(response.data)
                    this.id = response.data.id
                })
            }  
            alert('Contact enregister!');
        }, 
        noEnter(e) {
		    e = e || window.event;
		    var key = e.keyCode || e.charCode;
		    //alert('e.type: ' + e.type + '; key: ' + key);
		    return key !== 13; 
		} 
    }
}
        
</script>