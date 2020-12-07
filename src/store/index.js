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
    searchUser: ""
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
      /* [ { "id": 31,
       "type": "one_to_one",
        "participants": [ "Florian", "Alice" ],
         "messages": [],
          "title": null,
           "theme": "BLUE", 
           "nicknames": {}, 
           "updated_at": "2020-12-07T08:07:57.519Z",
            "seen": { "Florian": -1, "Alice": -1 },
             "typing": {} } ]

         
             
             
             */
      return state.conversations.map((conversation) => {
        return {
          id: conversation.id,
          type: conversation.type,
          participants: conversation.participants,
          messages: conversation.messages,
          title: function getTitre(state, type, participants) {
            let titre = "titre";
            if (type === "one_to_one") {
              titre = participants.find((el) => el !== state.user.username);
            } else {
              titre = "Groupe: ";
              titre += participants.join(",");
            }
            return titre;
          },
          theme: conversation.theme,
          nicknames: conversation.nicknames,
          updated_at: conversation.updated_at,
          seen: conversation.seen,
          typing: conversation.typing
        };
      });
    },

    conversation(state, getters) {
      //TODO
    },

    filteredUsers(state) {
      let allUsers = state.users.map((user) => ({
        username: user.username,
        picture_url: user.picture_url,
        awake: user.awake,
        isSelected: false
      }));
      return allUsers.filter((user) =>
        user.username.toLowerCase().includes(state.searchUser.toLowerCase())
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

    setSearchUser(state, input) {
      state.searchUser = input;
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

    initializeAfterAuthentication({ dispatch }) {
      dispatch("fetchUsers");
      //TODO: dispatch("fetchConversations");
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
    }
  }
});
