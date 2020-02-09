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
        />
      </fieldset>
      <fieldset class="note__field">
        <h2 class="note__field-title">Add todo items:</h2>
        <div class="note__field-wrap">
          <!-- <input
            type="text"
            name="todo_name"
            v-model="currentTodo.name"
            @keyup.enter="addTodo()"
            class="input"
            placeholder="Enter todo description"
          /> -->
          <textarea
            name="todo_name"
            v-model="currentTodo.name"
            @keyup.enter="addTodo()"
            class="input input--textarea"
            placeholder="Enter todo description"
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
          <div
            class="todo__item"
            v-for="(singleTodo, index) in sendData.todos"
            :key="index"
          >
            <todo-completed
              @success="changeSuccessTodo(index)"
              :value="singleTodo.success"
            />
            <span
              class="todo__item-title"
              :class="{ 'is-completed': singleTodo.success }"
              >{{ singleTodo.name }}</span
            >
            <button
              type="button"
              @click="deleteTodo(index)"
              class="btn btn--icon todo__item-delete"
            >
              <delete-icon title="Delete this note" />
            </button>
          </div>
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
          Add note
        </button>
        <router-link :to="{ name: 'home' }" class="btn btn--cancel">
          Cancel
        </router-link>
      </div>
    </form>
  </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import { mapActions } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import TodoCompleted from "../components/TodoCompleted";

export default {
  name: "Note",
  components: {
    DeleteIcon,
    TodoCompleted
  },
  data() {
    return {
      currentTodo: {
        name: "",
        success: false
      },
      sendData: {
        name: "",
        todos: []
      }
    };
  },
  methods: {
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
    }
  }
};
</script>
