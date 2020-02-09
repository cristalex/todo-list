<template>
  <div class="note__item">
    <div class="note__item-inner">
      <span class="note__item-title">{{ item.name }}</span>
      <button type="button" class="btn btn--icon note__item-edit">
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
        v-for="(item, todoIndex) in getTodosShortList(item.todos, 3)"
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
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";
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
      required: true,
    }
  },
  // data() {
  //   return {

  //   }
  // }
  methods: {
    getTodosShortList(data, count) {
      return data.slice(0, count);
    }
  }
};
</script>
