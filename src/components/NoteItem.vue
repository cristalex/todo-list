<template>
  <div class="note__item">
    <div class="note__item-inner">
      <span class="note__item-title">{{ item.name }}</span>
      <button
        type="button"
        class="btn btn--icon note__item-edit"
        @click="editNoteItem(id)"
      >
        <edit-icon title="Edit this note" />
      </button>
      <button
        type="button"
        @click="$emit('delNote')"
        class="btn btn--icon note__item-delete"
      >
        <delete-icon title="Delete this note" />
      </button>
    </div>
    <div class="note__item-todos" v-if="item.todos.length">
      <div
        class="note__item-todo"
        v-for="(item, todoIndex) in getTodosShortList(item.todos)"
        :key="todoIndex"
      >
        <todo-completed
          @success="changeSuccessTodo(index)"
          :value="item.success"
          minicheck
        />
        <h3 :class="{ 'is-completed': item.success }">
          {{ item.name }}
        </h3>
      </div>
    </div>
    <div class="no-items-text" v-else>No todos added</div>
  </div>
</template>
<script>
import { SETTINGS } from "../settings";
import { mapMutations } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete";
import EditIcon from "vue-material-design-icons/Pencil";
import TodoCompleted from "../components/TodoCompleted";

export default {
  name: "NoteItem",
  components: {
    DeleteIcon,
    EditIcon,
    TodoCompleted
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations(["SET_EDIT_MODE"]),
    getTodosShortList(data) {
      return data.slice(0, SETTINGS.NOTES_TODO_LIMIT);
    },
    editNoteItem(id) {
      this.SET_EDIT_MODE(id);
      // console.log("ID: ", id);
      // this.$router.push({ name: "note", params: { id: id } });
    }
  }
};
</script>
