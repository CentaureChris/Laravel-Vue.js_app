export default {
    state: {
        // Define states: each state is a subjet to subscribe
        clients: undefined,
    },
    
    getters: {
        // Define getters: each states must have getters
        clients: (state) => state.clients,
    },

    mutations: {
        // Define mutations: each states must have mutation
        CLIENTS( state, payload ){ state.clients = payload.data },
    },

    actions: {
        // CRUD: read one
        readObject(context, data){
            fetch( `${data.path}`, {
                method: `GET`,
            })
            .then( response => response.json(response)) // Parse response
                .then( async apiResponse => {
                    // Call action methond within action method
                    context.commit("CLIENTS",{data:apiResponse})
                })
            .catch( apiError => {
            })
        },
        deleteObject(context, data){
            fetch(`${data.path}`,{
                method: `DELETE`,
            })
            .then( response => response.json(response))
                .then( async apiResponse => {
                    context.commit('CLIENTS',{data:apiResponse})
                })
            .catch( apiError => {
            })
        }
    }
}