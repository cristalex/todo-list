import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    popup: null,
    editMode: false,
    editId: null
  },
  getters: {
    GET_NOTES_LIST: state => {
      return state.notes;
    },
    GET_POPUP_STATE: state => {
      return !!state.popup;
    },
    GET_EDITMODE_STATE: state => {
      return state.editMode;
    }
  },
  mutations: {
    ADD_NOTE: (state, payload) => {
      if (state.editMode) {
        state.notes.splice(state.editId, 1, payload);
      } else {
        state.notes.push(payload);
      }
    },
    REMOVE_NOTE: (state, payload) => {
      state.notes.splice(payload, 1);
    },
    SET_POPUP: (state, payload) => {
      state.popup = payload;
    },
    SET_EDIT_MODE: (state, payload) => {
      state.editMode = true;
      state.editId = payload;
      router.push({ name: "note", params: { id: payload } });
    },
    UNSET_EDIT_MODE: state => {
      state.editMode = false;
      state.editId = null;
    }
  },
  actions: {
    SAVE_NOTE: (context, payload) => {
      // context.commit('SET_LOADING', true);
      context.commit("ADD_NOTE", payload);
      if (context.state.editMode) {
        context.commit("UNSET_EDIT_MODE");
      }
      // console.log("Note added to list!");
      setTimeout(() => {
        router.push({ name: "home" });
      }, 600);
    },
    DELETE_NOTE: context => {
      context.commit("REMOVE_NOTE", context.state.popup.id);
      context.commit("SET_POPUP", null);
      // console.log("Note deleted from list!");
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "TodoListApp"
    })
  ]
});
