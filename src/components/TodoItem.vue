<template>
  <div class="todo__item">
    <todo-completed @success="$emit('successTodo')" :value="item.success" />
    <div class="todo__item-wrap">
      <span
        v-if="!isEditing"
        class="todo__item-title"
        :class="{ 'is-completed': item.success }"
        title="Click twice to edit"
        @dblclick="enableEdit"
        >{{ item.name }}</span
      >
      <textarea
        v-if="isEditing"
        ref="editInput"
        v-model="localContent"
        type="text"
        :maxlength="settings.MAX_TODO_LENGTH"
        class="input input--textarea input--fs-big"
        @keydown.enter="saveEdit"
        @blur="saveEdit"
        @keyup.esc="stopEdit"
      >
      </textarea>
    </div>
    <div class="todo__btns">
      <button
        type="button"
        class="btn btn--icon note__item-edit"
        @click="enableEdit"
      >
        <edit-icon title="Edit this note" />
      </button>
      <button
        type="button"
        @click="$emit('deleteTodo')"
        class="btn btn--icon todo__item-delete"
      >
        <delete-icon title="Delete this note" />
      </button>
    </div>
  </div>
</template>
<script>
import SettingsMixin from "../mixins/SettingsMixin";
import TodoCompleted from "../components/TodoCompleted";
import DeleteIcon from "vue-material-design-icons/Delete";
import EditIcon from "vue-material-design-icons/Pencil";
export default {
  name: "TodoItem",
  components: {
    TodoCompleted,
    DeleteIcon,
    EditIcon
  },
  mixins: [SettingsMixin],
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
  data() {
    return {
      isEditing: false,
      editId: null,
      localContent: ""
    };
  },
  methods: {
    // Enable editing mode of todo
    async enableEdit(id) {
      this.editId = id;
      this.localContent = this.item.name;
      this.isEditing = true;
      await this.$nextTick();
      this.$refs.editInput.focus();
    },
    // Save new content in current todo
    saveEdit() {
      if (this.localContent) {
        this.$emit("updateTodo", {
          id: this.id,
          name: this.localContent
        });
      }
      this.stopEdit();
    },
    // Cancel editing the current item
    stopEdit() {
      this.isEditing = false;
      this.contentLocal = "";
    }
  }
};
</script>
