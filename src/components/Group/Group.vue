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
        v-if="conversation.participants.length>3"
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
        @click="removeUser(user)"
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
      ><i v-if="conversation.type!=='one_to_one'" title="Ajouter à la conversation" class="circular plus icon link" @click="addUser(user)"></i>
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
    ...mapGetters(["conversation","filteredUsersInConversation","filteredUsersNotInConversation"]),
    ...mapState(["groupUsersFilter"])
  },
  methods: {
    ...mapMutations(["setGroupUsersFilter"]),
    ...mapActions(["addParticipant","removeParticipant"]),
    addUser(user){
      if(this.conversation.type!=="one_to_one"){
        let inputs={conversation_id:this.conversation.id,username:user.username};
        this.addParticipant(inputs);
      }
    },
    removeUser(user){
      if(this.conversation.participants.length>3){
        let inputs={conversation_id:this.conversation.id,username:user.username};
        this.removeParticipant(inputs);
      }
    }
  }
};
</script>

<style src="./Group.css" scoped />
