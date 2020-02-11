import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// Init Vuex Store
export default new Vuex.Store({
  state: {
    notes: [],
    popup: null,
    editMode: false,
    editId: null
  },
  getters: {
    // Getting list of notes
    GET_NOTES_LIST: state => {
      return state.notes;
    },
    // Get active/inactive popup state
    GET_POPUP_STATE: state => {
      return !!state.popup;
    },
    // Get active/inactive state of Edit mode for note
    GET_EDITMODE_STATE: state => {
      return state.editMode;
    }
  },
  mutations: {
    // Adding new note or update existing note
    ADD_NOTE: (state, payload) => {
      if (state.editMode) {
        state.notes.splice(state.editId, 1, payload);
      } else {
        state.notes.push(payload);
      }
    },
    // Deleting note
    REMOVE_NOTE: (state, payload) => {
      state.notes.splice(payload, 1);
    },
    // Set state for show or hide popup window
    SET_POPUP: (state, payload) => {
      state.popup = payload;
    },
    // Set edit mode for note component
    SET_EDIT_MODE: (state, payload) => {
      state.editMode = true;
      state.editId = payload;
      router.push({ name: "note", params: { id: payload } });
    },
    // Exit from edit mode
    UNSET_EDIT_MODE: state => {
      state.editMode = false;
      state.editId = null;
    }
  },
  actions: {
    // Save note action
    SAVE_NOTE: (context, payload) => {
      context.commit("ADD_NOTE", payload);
      if (context.state.editMode) {
        context.commit("UNSET_EDIT_MODE");
      }
      router.push({ name: "home" });
    },
    // Delete note action
    DELETE_NOTE: context => {
      context.commit("REMOVE_NOTE", context.state.popup.id);
      context.commit("SET_POPUP", null);
    }
  },
  modules: {},
  plugins: [
    // Adding Presisted State plugin for saving local states in LocalStorage
    createPersistedState({
      key: "TodoListApp"
    })
  ]
});
