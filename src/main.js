import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentUser: {},
    isUserLogged: false,
  },
  mutations: {
    getUserInfo(state, currentUser) {
      state.currentUser = currentUser

    },
    setIfUserIsLogged(state, boolean) {
      state.isUserLogged = boolean
    }
  },
  plugins: [createPersistedState()],
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
