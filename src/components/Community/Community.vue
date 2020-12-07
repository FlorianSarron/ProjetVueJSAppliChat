<template>
  <div class="community">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            @input="setSearchUser($event.target.value)"
            :value="searchUser"
            class="prompt"
            type="text"
            placeholder="Rechercher un utilisateur"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div class="users">
      <div class="user" v-bind:class="{ selected: isSelected(user)}"  v-for="user in filteredUsers" :key="user.username" @click="toggleSelected(user)">
        <img :src="user.picture_url" /><span
          class="">
          {{user.username}}</span
        >
      </div>
    </div>

    <div class="actions">
      <button class="ui primary big button" @click="openConversation">
        <i class="conversation icon"></i>
        <span>
          Ouvrir la conversation (2)
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions ,mapMutations,mapState} from "vuex";

export default {
  name: "Community",
  data() {
    return {
      selectedUsers: []
    };
  },
  methods: {
    ...mapMutations(["setSearchUser"]),
    ...mapActions(["createOneToOneConversation","createManyToManyConversation"]),
    openConversation() {

      if (this.selectedUsers.length === 1) {
        let promise = this.createOneToOneConversation(this.selectedUsers[0]);

        promise.finally(() => {
        console.log("Conversation ouverte !");
        });
      }

      if (this.selectedUsers.length > 1) {
        let usersArray = [];
        this.selectedUsers.forEach(selectedUser => {
          usersArray.push(selectedUser);
          console.log(selectedUser);
        });
        let promiseMany = this.createManyToManyConversation(usersArray);

        promiseMany.finally(() => {
        console.log("Conversation de groupe ouverte !");
        });
      }
    },
    toggleSelected(user){
      if(this.isSelected(user)){
        this.selectedUsers=this.selectedUsers.filter((el) =>el!==user.username);
      }
      else{
        this.selectedUsers.push(user.username);
      }
    },
    isSelected(user){
      if(this.selectedUsers.find((el) =>el===user.username)){
        return true;
      }
      else{
        return false;
      }
      
    }
  },
  computed: {
    ...mapState(["searchUser"]),
    ...mapGetters(["users","filteredUsers","selectedUsersForOpenConversation"]),
  }
};
</script>

<style src="./Community.css" scoped />
