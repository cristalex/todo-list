<template>
  <section class="note">
    <h1 class="home__title">Note</h1>
    <form action="">
      <fieldset class="note__field">
        <h2 class="note__field-title">Note title:</h2>
        <input
          type="text"
          name="note_name"
          v-model="noteData.name"
          class="input"
          placeholder="Enter note title"
          :maxlength="settings.MAX_NOTE_LENGTH"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="note__field">
        <h2 class="note__field-title">Add todo items:</h2>
        <div class="note__field-wrap">
          <textarea
            name="todo_name"
            v-model="currentTodo.name"
            @keyup.enter="addTodo()"
            class="input input--textarea"
            placeholder="Enter todo description"
            :maxlength="settings.MAX_TODO_LENGTH"
          >
          </textarea>
          <button
            type="button"
            :disabled="!currentTodo.name"
            @click="addTodo()"
            class="btn"
            :class="{ 'btn--disabled': !currentTodo.name }"
          >
            Add todo
          </button>
        </div>
      </fieldset>
      <div class="note__btns">
        <button
          type="button"
          :disabled="!noteData.name"
          @click="sendDataNote()"
          class="btn"
          :class="{ 'btn--disabled': !noteData.name }"
        >
          <add-note-icon
            :title="GET_EDITMODE_STATE ? 'Update note' : 'Add note'"
          />
          <span>{{ GET_EDITMODE_STATE ? "Update note" : "Add note" }}</span>
        </button>
        <button
          type="button"
          @click="confirmDeletion($route.params.id)"
          class="btn btn--delete"
          v-show="GET_EDITMODE_STATE"
        >
          <delete-icon title="Delete this note" />
          <span>Delete note</span>
        </button>
        <button
          type="button"
          class="btn btn--cancel"
          v-show="GET_EDITMODE_STATE"
          @click="confirmCancelation()"
        >
          <cancel-icon title="Cancel changes" />
          <span>Cancel</span>
        </button>
        <router-link
          :to="{ name: 'home' }"
          class="btn btn--cancel"
          v-show="!GET_EDITMODE_STATE"
        >
          <cancel-icon title="Cancel changes" />
          <span>Cancel</span>
        </router-link>
        <button
          type="button"
          class="btn"
          v-show="GET_EDITMODE_STATE && isNoteChanged"
          @click="undoNoteChanges()"
          v-cloak
        >
          <undo-icon title="Undo last changes" />
          <span>Undo</span>
        </button>
        <button
          type="button"
          class="btn"
          v-show="GET_EDITMODE_STATE && redoCopy"
          @click="redoNoteChanges()"
          v-cloak
        >
          <redo-icon title="Redo last changes" />
          <span>Redo</span>
        </button>
      </div>
      <div class="todo">
        <h2 class="todo__title">Todos list</h2>
        <div class="todo__list" v-if="noteData.todos.length">
          <todo-item
            v-for="(singleTodo, todoIndex) in noteData.todos"
            :key="todoIndex"
            :item="singleTodo"
            :id="todoIndex"
            @successTodo="changeSuccessTodo(todoIndex)"
            @deleteTodo="deleteTodo(todoIndex)"
            @updateTodo="updateTodo"
          />
        </div>
        <div class="no-items-text" v-else>No todos added</div>
      </div>
    </form>
    <popup
      @confirm="confirmAction()"
      :active="GET_POPUP_STATE || (GET_POPUP_STATE && cancelPopupState)"
      :item="popupItem"
    />
  </section>
</template>

<script>
import { SETTINGS } from "../settings";
import SettingsMixin from "../mixins/SettingsMixin";
import NoteMixin from "../mixins/NoteMixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete";
import AddNoteIcon from "vue-material-design-icons/ClipboardPlus";
import UndoIcon from "vue-material-design-icons/Undo";
import RedoIcon from "vue-material-design-icons/Redo";
import CancelIcon from "vue-material-design-icons/Cancel";
import TodoItem from "../components/TodoItem";
import Popup from "../components/Popup";

export default {
  name: "Note",
  components: {
    DeleteIcon,
    AddNoteIcon,
    UndoIcon,
    RedoIcon,
    TodoItem,
    CancelIcon,
    Popup
  },
  mixins: [SettingsMixin, NoteMixin],
  data() {
    return {
      currentTodo: {
        name: "",
        success: false
      },
      noteData: {
        name: "",
        todos: []
      },
      cancelPopupState: false,
      startCopy: null,
      redoCopy: null
    };
  },
  computed: {
    ...mapGetters(["GET_EDITMODE_STATE"]),
    // Item selection (for popup) based on value of cancelPopupState
    popupItem() {
      return this.cancelPopupState
        ? SETTINGS.POPUP_CANCEL_NOTE
        : SETTINGS.POPUP_DELETE_NOTE;
    },
    // True if a note has been modified
    isNoteChanged() {
      return this.startCopy !== JSON.stringify(this.noteData);
    }
  },
  mounted() {
    // Init states if Edit mode of note is selected
    if (this.GET_EDITMODE_STATE) {
      this.noteData = JSON.parse(
        JSON.stringify(this.GET_NOTES_LIST[this.$route.params.id])
      );
      this.startCopy = JSON.stringify(
        this.GET_NOTES_LIST[this.$route.params.id]
      );
    }
  },
  methods: {
    ...mapMutations(["UNSET_EDIT_MODE"]),
    ...mapActions(["SAVE_NOTE"]),
    // Add new todo in Todo List and clear
    addTodo() {
      this.noteData.todos.push(this.currentTodo);
      this.clearTodoData();
    },
    // Change success todo status
    changeSuccessTodo(id) {
      this.noteData.todos[id].success = !this.noteData.todos[id].success;
    },
    // Delete single todo from note
    deleteTodo(id) {
      this.noteData.todos.splice(id, 1);
    },
    // Update todo description
    updateTodo(data) {
      this.noteData.todos[data.id].name = data.name;
    },
    // Clear todo data
    clearTodoData() {
      this.currentTodo = {
        name: "",
        success: false
      };
    },
    // Clear note data
    clearNoteData() {
      this.noteData = {
        name: "",
        todos: []
      };
    },
    // Save note name and todo list to new note
    sendDataNote() {
      // Save todo in todo list if todo field not empty
      if (this.currentTodo.name) {
        this.addTodo();
      }
      this.SAVE_NOTE(this.noteData);
      this.clearNoteData();
    },
    // Cancel changes of current note
    cancelNoteChanges() {
      this.UNSET_EDIT_MODE();
      this.SET_POPUP(null);
      this.$router.push({ name: "home" });
    },
    // Undo changes in current note
    undoNoteChanges() {
      this.redoCopy = JSON.stringify(this.noteData);
      this.noteData = JSON.parse(this.startCopy);
    },
    // Redo again changes in current nore
    redoNoteChanges() {
      this.noteData = JSON.parse(this.redoCopy);
      this.redoCopy = null;
    },
    // Confirm action in popup: Cancel note changes or delete note
    confirmAction() {
      if (this.cancelPopupState) {
        this.cancelNoteChanges();
      } else {
        this.deleteNote();
      }
    }
  }
};
</script>
