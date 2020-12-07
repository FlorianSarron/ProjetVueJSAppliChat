<template>
  <div class="sidebar">
    <div class="user">
      <div class="user-picture">
        <img :src="user.picture_url" class="ui circular image" />
      </div>

      <div class="user-info">
        <div class="user-info-pseudo">{{ user.username }}</div>

        <div class="user-info-status ui simple dropdown">
          <div class="available text">
            En ligne
          </div>
          <i class="dropdown icon"> </i>
          <div class="menu">
            <div class="item" @click="deauthenticate">
              <i class="logout icon"> </i>
              Déconnexion
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menu">
      <div class="blue button" @click="openCommunity">
        <i class="users icon"> </i>
        <br />
        <span>Communauté</span>
      </div>
      <div v-if="true" class="blue button" @click="openMessageSearch">
        <i class="search icon"> </i>
        <br />
        <span>Messages</span>
      </div>
    </div>
    <div class="conversations">
      <div class="conversation-search">
        <div class="ui fluid search">
          <div class="ui icon input">
            <input
              class="prompt"
              placeholder="Rechercher une conversation"
              type="text"
            />
            <i class="search icon"> </i>
          </div>
        </div>
      </div>
    
      <div
        class="conversation"
        v-for="conversation in conversations"
        :key="conversation.id"
        :title="conversation.title"
        @click="openConversation(conversation.id)"
      >
        <a class="avatar" v-if="conversation.isManyToMany">
          <span>
            <i :class="conversation.avatarClass"> </i>
          </span>
        </a>
        <a class="avatar" v-if="!conversation.isManyToMany">
          <img :src="conversation.avatarClass" />
        </a>
        <div class="content">
          <div class="metadata">
            <div class="title">{{conversation.title}}</div>
            <span class="time">{{new Date(conversation.updated_at).toLocaleString("fr-FR",{
              hour:'2-digit',
              minute:'2-digit'})}}</span>
          </div>
          <div class="text">{{conversation.subTitle}}</div>
        </div>
      </div> 
    
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    ...mapActions(["deauthenticate"]),
    openCommunity() {
      router.push({ name: "Community" });
    },
    openMessageSearch() {
      router.push({ name: "Search" });
    },
    openConversation(id) {
      router.push({ name: "Conversation", params: { id } });
    }
  },
  computed: {
    ...mapGetters(["user", "conversations", "conversation"])
    
  }
};
</script>

<style scoped src="./Sidebar.css" />
