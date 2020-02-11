import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import styles
import "vue-material-design-icons/styles.css";
import "./styles/app.scss";

Vue.config.productionTip = false;

// Init app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
