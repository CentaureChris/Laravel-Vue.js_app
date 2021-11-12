/* 
Imports and config
*/
    // Import Vue
    import Vue from "vue";
    
    // Import VueX modules
    import Vuex from "vuex";
    import createPersistedState from "vuex-persistedstate";

    // Import App store module
    import crud from "./modules/crud";
    import auth from "./modules/auth";

    // Set up Vuex
    Vue.use(Vuex);
//



/* 
Export store
*/
    export default new Vuex.Store({
        // Used to add App store modules
        modules: {
            crud,
            auth
        },
        
        // Used to add VueX plugins
        plugins: [
            createPersistedState()
        ]
    });
//