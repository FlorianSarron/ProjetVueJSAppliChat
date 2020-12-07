import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticating: false,
    user: {
      username: null,
      token: null,
      picture_url: null
    },
    users: [],
    filteredUsers: [],
    conversations: [],
    currentConversationId: null,
    usersAvailable: [],
    searchUser: "",
    groupUsersFilter: ""
  },
  getters: {
    authenticating(state) {
      return state.authenticating;
    },
    authenticated(state) {
      return state.user.token !== null;
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users.map((user) => ({
        username: user.username,
        picture_url: user.picture_url,
        awake: user.awake,
        isSelected: false
      }));
    },
    conversations(state) {
      return state.conversations
        .map((conversation) => {
          return {
            id: conversation.id,
            type: conversation.type,
            participants: conversation.participants,
            messages: conversation.messages,
            title:
              conversation.type === "one_to_one"
                ? conversation.participants.find(
                    (el) => el !== state.user.username
                  )
                : "Groupe: " + conversation.participants.join(","),
            theme: conversation.theme,
            nicknames: conversation.nicknames,
            updated_at: conversation.updated_at,
            seen: conversation.seen,
            typing: conversation.typing,
            avatarClass:
              conversation.type === "one_to_one"
                ? state.users.find(
                    (user) =>
                      user.username ===
                      conversation.participants.find(
                        (el) => el !== state.user.username
                      )
                  ).picture_url
                : "users icon",
            subTitle:
              conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1]
                : "Nouvelle Conversation",
            isManyToMany: conversation.type === "one_to_one" ? false : true
          };
        })
        .sort(function (a, b) {
          return new Date(b.updated_at - new Date(a.updated_at));
        });
    },

    conversation(state) {
      let allConvs = state.conversations.map((conversation) => {
        return {
          id: conversation.id,
          type: conversation.type,
          participants: conversation.participants,
          messages: conversation.messages,
          title:
            conversation.type === "one_to_one"
              ? conversation.participants.find(
                  (el) => el !== state.user.username
                )
              : "Groupe: " + conversation.participants.join(","),
          theme: conversation.theme,
          nicknames: conversation.nicknames,
          updated_at: conversation.updated_at,
          seen: conversation.seen,
          typing: conversation.typing,
          avatarClass:
            conversation.type === "one_to_one"
              ? state.users.find(
                  (user) =>
                    user.username ===
                    conversation.participants.find(
                      (el) => el !== state.user.username
                    )
                ).picture_url
              : "users icon",
          subTitle:
            conversation.messages.length > 0
              ? conversation.messages[conversation.messages.length - 1]
              : "Nouvelle Conversation",
          isManyToMany: conversation.type === "one_to_one" ? false : true
        };
      });
      return allConvs.find((conv) => conv.id === state.currentConversationId);
    },

    filteredUsers(state) {
      return state.users.filter((user) =>
        user.username.toLowerCase().includes(state.searchUser.toLowerCase())
      );
    },
    filteredUsersInConversation(state) {
      let conv = state.conversations.find(
        (conv) => conv.id === state.currentConversationId
      );
      let userTab = [];
      state.users.forEach(function (user) {
        conv.participants.forEach(function (username) {
          if (user.username === username) {
            userTab.push(user);
          }
        });
      });
      return userTab.filter((user) =>
        user.username
          .toLowerCase()
          .includes(state.groupUsersFilter.toLowerCase())
      );
    },
    filteredUsersNotInConversation(state) {
      let conv = state.conversations.find(
        (conv) => conv.id === state.currentConversationId
      );
      let userTabIn = [];
      state.users.forEach(function (user) {
        conv.participants.forEach(function (username) {
          if (user.username === username) {
            userTabIn.push(user);
          }
        });
      });
      let userTabOut = [];
      state.users.forEach(function (user) {
        conv.participants.forEach(function (username) {
          if (user.username !== username) {
            if (!userTabOut.find((el) => el === user)) {
              if (!userTabIn.find((el) => el === user)) {
                userTabOut.push(user);
              }
            }
          }
        });
      });

      return userTabOut.filter((user) =>
        user.username
          .toLowerCase()
          .includes(state.groupUsersFilter.toLowerCase())
      );
    }
  },
  mutations: {
    syncCurrentConversation(state, conversationId) {
      state.currentConversationId = conversationId;
    },
    setAuthenticating(state, authenticating) {
      state.authenticating = authenticating;
    },
    setUser(state, { username, token, picture_url }) {
      Vue.set(state.user, "username", username);
      Vue.set(state.user, "token", token);
      Vue.set(state.user, "picture_url", picture_url);
    },
    setUsers(state, users) {
      state.users = users;
    },

    setConversations(state, conversations) {
      state.conversations = conversations;
    },

    upsertUser(state, { user }) {
      const localUserIndex = state.users.findIndex(
        (_user) => _user.username === user.username
      );

      if (localUserIndex !== -1) {
        Vue.set(state.users, localUserIndex, user);
      } else {
        state.users.push({
          ...user
        });
      }
    },

    upsertConversation(state, { conversation }) {
      console.log("upsertConversation");
      const localConvIndex = state.conversations.findIndex(
        (_conv) => _conv.id === conversation.id
      );

      if (localConvIndex !== -1) {
        Vue.set(state.conversations, localConvIndex, conversation);
      } else {
        state.conversations.push({
          ...conversation
        });
      }
    },

    upsertMessage(state, { conversation_id }, { message }) {
      console.log("upsertConversation");
    },

    setSearchUser(state, input) {
      state.searchUser = input;
    },

    setGroupUsersFilter(state, input) {
      state.groupUsersFilter = input;
    }
  },
  actions: {
    authenticate({ commit, dispatch }, { username, password }) {
      if (!username || !password) {
        return;
      }
      commit("setAuthenticating", true);
      Vue.prototype.$client
        .authenticate(username, password)
        .then((user) => {
          commit("setUser", user);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          dispatch("initializeAfterAuthentication");
        })
        .catch(() => {
          alert("Erreur d'authentification !");
        })
        .finally(() => {
          commit("setAuthenticating", false);
        });
    },

    deauthenticate() {
      localStorage.removeItem("password");
      window.location.reload();
    },

    initializeAfterAuthentication({ dispatch, commit }) {
      dispatch("fetchUsers");
      Vue.prototype.$client.getConversations().then(({ conversations }) => {
        commit("setConversations", conversations);
      });
    },

    fetchUsers({ commit }) {
      Vue.prototype.$client.getUsers().then(({ users }) => {
        commit("setUsers", users);
      });
    },

    createOneToOneConversation({ commit }, username) {
      const promise = Vue.prototype.$client.getOrCreateOneToOneConversation(
        username
      );

      promise.then(({ conversation }) => {
        commit("upsertConversation", { conversation });
        console.log("mutation conversation");

        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promise;
    },

    createManyToManyConversation({ commit }, usernames) {
      const promiseMany = Vue.prototype.$client.createManyToManyConversation(
        usernames
      );

      promiseMany.then(({ conversation }) => {
        commit("upsertConversation", { conversation });
        console.log("mutation conversation groupe");

        router.push({
          name: "Conversation",
          params: { id: conversation.id }
        });
      });

      return promiseMany;
    },

    postMessage({ commit }, conversation_id, input) {
      const promiseMessage = Vue.prototype.$client.postMessage(
        conversation_id,
        input
      );

      promiseMessage.then(({ conversation_id }, { message }) => {
        commit("upsertMessage", { conversation_id }, { message });
        console.log("mutation message envoyé");
      });

      return promiseMessage;
    }
  }
});
