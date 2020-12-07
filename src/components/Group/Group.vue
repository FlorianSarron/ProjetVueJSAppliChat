<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
          @input="setGroupUsersFilter($event.target.value)"
          :value="groupUsersFilter"
          type="text"
          placeholder="Rechercher un utilisateur"
          class="prompt"
        /><i class="search icon"></i>
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>
    <div class="user" v-for="user in filteredUsersInConversation" :key="user.username">
      <img :src="user.picture_url" /><span
        >{{user.username}}<br /><i class="nickname"></i></span
      ><i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
      ></i>
    </div>
   
    <div class="spanner">
      <hr />
      <span>Communauté</span>
      <hr />
    </div>
    <div class="user" v-for="user in filteredUsersNotInConversation" :key="user.username">
      <img :src="user.picture_url" /><span
        >{{user.username}}</span
      ><i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Group",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters(["filteredUsersInConversation","filteredUsersNotInConversation"]),
    ...mapState(["groupUsersFilter"])
  },
  methods: {
    ...mapMutations(["setGroupUsersFilter"]),
    ...mapActions([])
  }
};
</script>

<style src="./Group.css" scoped />
