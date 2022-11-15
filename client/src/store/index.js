import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dashboardStore from './modules/dashboardStore'
import loginStore from './modules/loginStore'
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
    modules: {
        dashboardStore: dashboardStore,
        loginStore: loginStore
    },
    plugins: [createPersistedState({
        paths: ['loginStore']
    })]
})

export default store
