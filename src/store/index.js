import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    popup: null
  },
  getters: {
    GET_NOTES_LIST: state => {
      return state.notes;
    },
    GET_POPUP_STATE: state => {
      return !!state.popup;
    }
  },
  mutations: {
    ADD_NOTE: (state, payload) => {
      state.notes.push(payload);
    },
    REMOVE_NOTE: (state, payload) => {
      state.notes.splice(payload, 1);
    },
    SET_POPUP: (state, payload) => {
      state.popup = payload;
    }
  },
  actions: {
    SAVE_NOTE: (context, payload) => {
      // context.commit('SET_LOADING', true);
      context.commit("ADD_NOTE", payload);
      console.log("Note added to list!");
      setTimeout(() => {
        router.push({ name: "home" });
      }, 600);
    },
    DELETE_NOTE: context => {
      context.commit("REMOVE_NOTE", context.state.popup.id);
      context.commit("SET_POPUP", null);
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
