import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import client from "./client";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.commit(
    "syncCurrentConversation",
    to.name === "Conversation" ? to.params.id : null
  );
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.push({ name: "Community" });

Vue.use(client, store);
