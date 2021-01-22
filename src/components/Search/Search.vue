<template>
  <div class="search-message">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un message"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div class="conversations">
      <div class="conversation" v-for="conversation in conversations" :key="conversation.id">
        <div class="author">
          <template v-if="conversation.isManyToMany">
            <div class="avatar">M</div>
          </template>
          <template v-if="!conversation.isManyToMany">
            <img :src="conversation.avatarClass" />
            <span>{{conversation.title}}</span>
          </template>
        </div>
        <div class="messages" v-for="message in conversation.messages" :key="message.id">
          <div class="message">
            <div class="time">{{ new Date(message.posted_at).toLocaleString("fr-FR",{
                  hour:'2-digit',
                  minute:'2-digit'}) }}</div>
            <div class="bubble">
              {{message.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      
    };
  },
  methods: {
    
   
  },
  computed: {
    ...mapGetters([ "conversations"])
    

  }
};
</script>

<style src="./Search.css" scoped />
