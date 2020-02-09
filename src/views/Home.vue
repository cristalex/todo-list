<template>
  <div class="home">
    <div class="note">
      <div class="note__title">Notes list</div>
      <div class="note__list" v-if="GET_NOTES_LIST.length">
        <note-item
          v-for="(noteItem, noteIndex) in GET_NOTES_LIST"
          :key="noteIndex"
          :item="noteItem"
          @delNote="deleteNote(noteIndex)"
        />
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoteItem from "../components/NoteItem";

export default {
  name: "Home",
  components: {
    NoteItem
  },
  // data() {
  //   return {

  //   };
  // }
  computed: {
    ...mapGetters(["GET_NOTES_LIST"])
  },
  methods: {
    ...mapActions(["DELETE_NOTE"]),
    deleteNote(id) {
      this.DELETE_NOTE(id);
    }
  }
};
</script>
