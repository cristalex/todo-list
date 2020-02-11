<template>
  <section class="note">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <form action="">
      <fieldset class="note__field">
        <h2 class="note__field-title">Note title</h2>
        <input
          type="text"
          name="note_name"
          v-model="sendData.name"
          class="input"
          placeholder="Enter note title"
          :maxlength="settings.MAX_NOTE_LENGTH"
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
      <div class="todo">
        <h1 class="todo__title">Todos list</h1>
        <div class="todo__list" v-if="sendData.todos.length">
          <todo-item
            v-for="(singleTodo, todoIndex) in sendData.todos"
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
      <div class="note__btns">
        <button
          type="button"
          :disabled="!sendData.name"
          @click="sendDataNote()"
          class="btn"
          :class="{ 'btn--disabled': !sendData.name }"
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
          Cancel
        </button>
        <router-link
          :to="{ name: 'home' }"
          class="btn btn--cancel"
          v-show="!GET_EDITMODE_STATE"
        >
          Cancel
        </router-link>
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
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { SETTINGS } from "../settings";
import SettingsMixin from "../mixins/SettingsMixin";
import NoteMixin from "../mixins/NoteMixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete";
import AddNoteIcon from "vue-material-design-icons/ClipboardPlus";
import TodoItem from "../components/TodoItem";
import Popup from "../components/Popup";

export default {
  name: "Note",
  components: {
    DeleteIcon,
    AddNoteIcon,
    TodoItem,
    Popup
  },
  mixins: [SettingsMixin, NoteMixin],
  data() {
    return {
      currentTodo: {
        name: "",
        success: false
      },
      sendData: {
        name: "",
        todos: []
      },
      cancelPopupState: false,
      startCopy: null
    };
  },
  computed: {
    ...mapGetters(["GET_EDITMODE_STATE"]),
    popupItem() {
      return this.cancelPopupState
        ? SETTINGS.POPUP_CANCEL_NOTE
        : SETTINGS.POPUP_DELETE_NOTE;
    }
  },
  mounted() {
    // console.log(this.$route.params.id, this.GET_NOTES_LIST[this.$route.params.id]);
    // console.log(this.GET_EDITMODE_STATE);
    if (this.GET_EDITMODE_STATE) {
      // this.sendData = this.GET_NOTES_LIST[this.$route.params.id];
      this.sendData = JSON.parse(
        JSON.stringify(this.GET_NOTES_LIST[this.$route.params.id])
      );
      this.startCopy = JSON.stringify(this.GET_NOTES_LIST[this.$route.params.id]);
      console.log(this.startCopy);
    }
  },
  methods: {
    ...mapMutations(["UNSET_EDIT_MODE"]),
    ...mapActions(["SAVE_NOTE"]),
    addTodo() {
      this.sendData.todos.push(this.currentTodo);
      this.currentTodo = {
        name: "",
        success: false
      };
    },
    changeSuccessTodo(id) {
      // console.log(this.sendData.todos[id]);
      this.sendData.todos[id].success = !this.sendData.todos[id].success;
    },
    deleteTodo(id) {
      this.sendData.todos.splice(id, 1);
    },
    updateTodo(data) {
      this.sendData.todos[data.id].name = data.name;
    },
    clearTodosList() {
      this.sendData = {
        name: "",
        todos: []
      };
    },
    sendDataNote() {
      if (this.currentTodo.name) {
        this.addTodo();
      }
      this.SAVE_NOTE(this.sendData);
      this.clearTodosList();
    },
    cancelNoteChanges() {
      this.UNSET_EDIT_MODE();
      this.SET_POPUP(null);
      this.$router.push({ name: "home" });
    },
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
