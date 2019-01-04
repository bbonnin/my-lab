import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'))

const authentication = {
    namespaced: true,
  state: user ? { status: { loggedIn: true }, user } : { status: {}, user: null },

  mutations: {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
            state.status = {};
            state.user = null;
        }
  },

  actions: {
    login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username });

            services.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            services.logout()
            commit('logout')
        }
  }
}

export default new Vuex.Store({
    modules: {
        authentication
    }
})