export default {
    state: {
        // Define states: each state is a subjet to subscribe
        connected: undefined,
    },
    
    getters: {
        // Define getters: each states must have getters
        connected: (state) => state.connected,
    },

    mutations: {
        // Define mutations: each states must have mutation
        CONNECTED( state, payload ){ state.connected = payload.data },
    },

    actions: {
        // CRUD: read one
        login(context, data){
            console.log( JSON.stringify(data.content))
            axios.post(data.path, data.content)
            .then((apiResponse) => {
                // Call action methond within action method
                context.commit("CONNECTED",{data:apiResponse})
            })
            .catch((errors) => {
                // this.errors = errors.response.data.errors
            })
        }

            // fetch( `${data.path}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            //     body: JSON.stringify(data.content),
            // })
            // .then( response => response.json(response)) // Parse response
            // .then( async apiResponse => {
            //     // Call action methond within action method
            //     context.commit("CONNECTED",{data:apiResponse})
            // })
            // .catch( apiError => {
            //     console.log(apiError)
            // })

    }
}