import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Note from "../views/Note";

Vue.use(VueRouter);

// Routes config
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/note/:id?",
    name: "note",
    component: Note,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
