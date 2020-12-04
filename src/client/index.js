import MetinetChatClient from "teach-vue-chat-client-library";

export let client = new MetinetChatClient(
  "wss://teach-vue-chat-server.glitch.me"
);

/**
 *
 * @param Vue
 * @param store Vuex.Store
 */
export default function install(Vue, store) {
  Vue.prototype.$client = client;

  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  if (username && password) {
    store.dispatch("authenticate", {
      username,
      password
    });
  }

  client.on("userCreated", async ({ user }) => {
    store.commit("upsertUser", { user });
  });

  client.on("conversationCreated", async ({ conversation }) => {
    store.commit("upsertConversation", { conversation });
  });

  client.on("participantAdded", async ({ conversation }) => {
    store.commit("upsertConversation", { conversation });
  });

  client.on("participantRemoved", async ({ conversation }) => {
    store.commit("upsertConversation", { conversation });
  });

  client.on("messagePosted", async ({ conversation_id, message }) => {
    //TODO
  });

  client.on("messageDelivered", async ({ conversation_id, message }) => {
    //TODO
  });

  client.on("conversationSeen", async ({ conversation }) => {
    //TODO
  });

  client.on("messageReacted", async ({ conversation_id, message }) => {
    //TODO
  });

  client.on("messageEdited", async ({ conversation_id, message }) => {
    //TODO
  });

  client.on("messageDeleted", async ({ conversation_id, message_id }) => {
    //TODO
  });

  client.on("usersAvailable", async ({ usernames }) => {
    //TODO
  });
}
