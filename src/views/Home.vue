<template>
  <div class="home">
    <div class="home__btns">
      <router-link :to="{ name: 'note' }" class="btn btn--center">
        <add-note-icon title="Add note" />
        <span>Add note</span>
      </router-link>
    </div>
    <div class="note">
      <div class="note__title">Notes list</div>
      <div class="note__list" v-if="GET_NOTES_LIST.length">
        <note-item
          v-for="(noteItem, noteIndex) in GET_NOTES_LIST"
          :key="noteIndex"
          :item="noteItem"
          @delNote="confirmDeletion(noteIndex)"
        />
        <!-- deleteNote(noteIndex) -->
        <!-- <div
          class="note__item"
          v-for="(noteItem, noteIndex) in GET_NOTES_LIST"
          :key="noteIndex"
        >
          <div class="note__item-inner">
            <span class="note__item-title">{{ noteItem.name }}</span>
            <button type="button" class="btn btn--icon note__item-edit">
              <edit-icon title="Edit this note" />
            </button>
            <button
              type="button"
              @click="deleteNote(noteIndex)"
              class="btn btn--icon note__item-delete"
            >
              <delete-icon title="Delete this note" />
            </button>
          </div>
          <div class="note__item-todos" v-if="noteItem.todos.length">
            <div
              class="note__item-todo"
              v-for="(todoItem, todoIndex) in getTodosShortList(
                noteItem.todos,
                3
              )"
              :key="todoIndex"
            >
              <todo-completed
                @success="changeSuccessTodo(index)"
                :value="todoItem.success"
                minicheck
              />
              <h3 :class="{ 'is-completed': todoItem.success }">
                {{ todoItem.name }}
              </h3>
            </div>
          </div>
          <div class="no-items-text" v-else>No todos added</div>
        </div> -->
      </div>
      <div class="no-items-text" v-else>No notes added</div>
    </div>
    <popup @confirm="deleteNote" :active="GET_POPUP_STATE" :item="settings.POPUP_DELETE_NOTE" />
  </div>
</template>

<script>
// import { SETTINGS } from "../settings";
import SettingsMixin from "../mixins/SettingsMixin";
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddNoteIcon from "vue-material-design-icons/ClipboardPlus";
import NoteItem from "../components/NoteItem";
import Popup from "../components/Popup";

export default {
  name: "Home",
  components: {
    AddNoteIcon,
    NoteItem,
    Popup
  },
  mixins: [SettingsMixin],
  data() {
    return {
      popupData: {
        text: "Confirm note deletion"
      }
    };
  },
  computed: {
    ...mapGetters(["GET_NOTES_LIST", "GET_POPUP_STATE"])
  },
  methods: {
    ...mapMutations(["SET_POPUP"]),
    ...mapActions(["DELETE_NOTE"]),
    deleteNote() {
      this.DELETE_NOTE();
    },
    confirmDeletion(deleteId) {
      console.log("Data id: ", deleteId);
      this.SET_POPUP({
        id: deleteId
      });
    }
  }
};
</script>
<style lang="scss">
.home {
  &__btns {
    margin-bottom: 1rem;
  }
}
</style>
