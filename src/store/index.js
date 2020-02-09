import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  getters: {
    GET_NOTES_LIST: state => {
      return state.notes;
    }
  },
  mutations: {
    ADD_NOTE: (state, payload) => {
      state.notes.push(payload);
    },
    REMOVE_NOTE: (state, payload) => {
      state.notes.splice(payload, 1);
    }
  },
  actions: {
    SAVE_NOTE: (context, payload) => {
      // context.commit('SET_LOADING', true);
      context.commit("ADD_NOTE", payload);
      console.log("Note added to list!");
      setTimeout(() => {
        router.push({ name: "home" });
      }, 1000);
    },
    DELETE_NOTE: (context, payload) => {
      context.commit("REMOVE_NOTE", payload);
      console.log("Note deleted from list!");
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "TodoListApp"
    })
  ]
});
