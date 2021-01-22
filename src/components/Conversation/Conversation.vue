<template>
  <div class="conversation">
    <div class="conversation-header">
            <img v-if="!conversation.isManyToMany" class="avatar" :src="conversation.avatarClass" />
      <div class="avatar" v-if="conversation.isManyToMany">
        <i class="ui users icon"></i>
      </div>

      <div class="title">
        <div class="ui compact">
          <i class="icon circle" v-if="isAwake()"></i>
          <span>{{ conversation.title }}</span>
          <div class="ui simple dropdown item">
            <i class="vertical ellipsis icon"></i>

            <div class="menu">
              <div v-if="true" class="item">
                <i class="ui icon paint brush"></i>
                Modifier le thème
              </div>
              <div v-if="true" class="item">
                <i class="ui icon edit"></i>
                Modifier le titre
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell slash"></i>
                Mettre en sourdine
              </div>
              <div v-if="true" class="item">
                <i class="ui icon volume bell"></i>
                Rétablir les notifications
              </div>
              <div class="item" @click="groupPanel = !groupPanel">
                <i class="ui icon users"></i>
                Gérer les participants
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- <div> {{ conversation }} </div> -->
    <!-- <div> {{ users }} </div> -->


    <div class="conversation-container">
      <div class="conversation-main">
        <div class="conversation-body" id="scroll">
          <div class="wrapper">
            <div v-for="message in conversation.messages" :key="message.id">
              <div v-if="message.from == user.username" >
                <div  class="time"> {{ new Date(message.posted_at).toLocaleString("fr-FR",{
                  hour:'2-digit',
                  minute:'2-digit'}) }}
                </div>
              <div v-if="message.reply_to !== null" class="message mine">
                <div class="bubble middle">
                  <p class="reply_content">{{ message.reply_to.content }}</p>
                  {{ message.content }}
                </div>
                <div class="reacts" v-for="reaction in message.reactions" :key="reaction">
                  <i :title="getReactTitle(reaction)" :class="getReactClass(reaction)"></i>
                </div>
                <div class="controls">
                  <i title="Supprimer" class="circular trash icon" @click="suppMessage(message)"></i>
                  <i title="Editer" class="circular edit icon" @click="editClick(message)"></i>
                  <i title="Répondre" class="circular reply icon"></i>
                </div>
              </div>
              <div v-if="message.reply_to == null" class="message mine">
                <div class="bubble top bottom"> {{ message.content }}</div>
                  <div class="reacts" v-for="reaction in message.reactions" :key="reaction">
                      <i :title="getReactTitle(reaction)" :class="getReactClass(reaction)"></i>
                  </div>
                  <div class="controls">
                    <i title="Supprimer" class="circular trash icon" @click="suppMessage(message)"></i>
                    <i title="Editer" class="circular edit icon" @click="editClick(message)"></i>
                    <i title="Répondre" class="circular reply icon"></i>
                  </div>
                </div>
              </div>
              <div v-if="message.from !== user.username">
                <div class="time">{{ new Date(message.posted_at).toLocaleString("fr-FR",{
                  hour:'2-digit',
                  minute:'2-digit'}) }}</div>
                <div v-if="message.reply_to !== null" class="message">
              <div class="bubble middle">
                <p class="reply_content">{{ message.reply_to.content }}</p>
                {{ message.content }}
              </div>
              <div class="reacts" v-for="reaction in message.reactions" :key="reaction">
                <i :title="getReactTitle(reaction)" :class="getReactClass(reaction)"></i>
              </div>
              <div class="controls">
                <i title="Répondre" class="circular reply icon" @click="replyMessage(message)"></i
                ><span class="react"
                      ><i 
                        title="Aimer"
                        class="circular heart outline icon"
                        @click="reactToMessage({reaction:'HEART',message:message})"
                      ></i
                      ><i
                        title="Pouce en l'air"
                        class="circular thumbs up outline icon"
                        @click="reactToMessage({reaction:'THUMB',message:message})"
                      ></i
                      ><i 
                        title="Content"
                        class="circular smile outline icon"
                         @click="reactToMessage({reaction:'HAPPY',message:message})"
                      ></i
                      ><i
                        title="Pas content"
                        class="circular frown outline icon"
                         @click="reactToMessage({reaction:'SAD',message:message})"
                      ></i
                    ></span>
              </div>
                </div>
                <div v-if="message.reply_to == null" class="message">
                  <img
                    :title="message.from"
                    :src="getImageFromMessage(message.from)"
                  />
                  <div class="bubble top bottom">{{ message.content }}</div>
                  <div class="reacts" v-for="reaction in message.reactions" :key="reaction">
                      <i :title="getReactTitle(reaction)" :class="getReactClass(reaction)"></i>
                  </div>
                  <div class="controls">
                    <i title="Répondre" class="circular reply icon" @click="replyMessage(message)"></i
                    >
                    <span class="react"
                      ><i 
                        title="Aimer"
                        class="circular heart outline icon"
                        @click="reactToMessage({reaction:'HEART',message:message})"
                      ></i
                      ><i
                        title="Pouce en l'air"
                        class="circular thumbs up outline icon"
                        @click="reactToMessage({reaction:'THUMB',message:message})"
                      ></i
                      ><i 
                        title="Content"
                        class="circular smile outline icon"
                         @click="reactToMessage({reaction:'HAPPY',message:message})"
                      ></i
                      ><i
                        title="Pas content"
                        class="circular frown outline icon"
                         @click="reactToMessage({reaction:'SAD',message:message})"
                      ></i
                    ></span>
                  </div>
                </div>
              </div>
              
            </div>
                <div class="view">
                  <img v-for="participant in filteredUsersInConversation" :key="participant.id"
                    :title="textSeen(participant)"
                    :src=participant.picture_url
                  />
                </div>
          </div>
        </div>

        
        <div class="conversation-footer">
          <div class="wrapper">
            <p v-if="isAnswer">
              <i @click="stopAnswer()" title="Abandonner" class="circular times small icon link"></i>
              Répondre à {{ answerTo }} :
              <span>
                {{ answerToMessage }}
              </span>
            </p>
            <p v-if="isEditing">
              <i @click="stopEditing()" title="Abandonner" class="circular times small icon link"></i>
              Edition :
            </p>

            <div class="ui fluid search">
              <div class="ui icon input">
                <input
                  id="inputMessage"
                  @keyup.enter="newMessage()"
                  class="prompt"
                  type="text"
                  placeholder="Rédiger un message"
                  v-model="inputMessage"
                />
                <i class="send icon" @click="newMessage()"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="conversation-sidebar" v-if="groupPanel">
        <Group />
      </div>
    </div>
  </div>
</template>

<script>
import Group from "@/components/Group/Group";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Conversation",
  components: { Group },
  data() {
    return {
      groupPanel: false,
      inputMessage:"",
      isAnswer: false,
      answerTo: "",
      answerToMessage: "",
      answerToId: 0,
      isEditing:false,
      editMessageId:0,
    };
  },
  mounted() {
    this.scrollBottom();
  },
  updated() {
    this.scrollBottom();
  },
  computed: {
    ...mapGetters(["conversation","user","users","filteredUsersInConversation","isConversationAwaken"])
  },
  methods: {
    ...mapActions(["postMessage","reactMessage","deleteMessage","editMessage"]),
    ...mapMutations([]),

    isAwake(){
      this.filteredUsersInConversation.forEach(function (user) {
          if(user.awake){
            return true;
          }
      });
      return false;

    },

    getImageFromMessage(usernameFind){
      console.log(usernameFind);
      let userFind = this.users.find((user) => user.username === usernameFind);

      console.log(userFind);
      return userFind.picture_url ;
    },

    textSeen(participant) {
       let val = "Vu par " + participant.username + " à 12:00";
       return val;
    },

    suppMessage(message) {
      let inputs = {
        idConv: this.conversation.id,
        idMessage: message.id
      };

      this.deleteMessage(inputs);
    },

    replyMessage(mess) {
      console.log("réponse au message : " + mess.content);
      this.stopEditing();
      this.isAnswer = true;
      this.answerTo = mess.from;
      this.answerToId = mess.id;
      this.answerToMessage = mess.content;
    },

    stopAnswer() {
      this.isAnswer = false;
    },

    stopEditing() {
      this.inputMessage="";
      this.isEditing = false;
    },

    newMessage() {
      if(this.isEditing){
        this.editionMessage();
      }
      else{
        let inputs;
        console.log(this.isAnswer);
        if(this.isAnswer === false) {
          inputs = {
          idConv: this.conversation.id,
          input: this.inputMessage
          }
        }
        if(this.isAnswer === true) {
          inputs = {
            idConv: this.conversation.id,
            idMessage: this.answerToId,
            input: this.inputMessage,
        }
        }
      
        console.log(inputs);
        let promise = this.postMessage(inputs);

        promise.finally(() => {
          this.inputMessage = "";
          this.isAnswer = false ;
        });
      }

    },
    scrollBottom() {
      setTimeout(() => {
        let scrollElement = document.querySelector("#scroll");
        if (scrollElement) {
          scrollElement.scrollTop = document.querySelector(
            "#scroll"
          ).scrollHeight;
        }
      }, 0);
    },
    reactToMessage(inputs){
      if (inputs.message !== undefined) {
        let donnees = {
          idConv: this.conversation.id,
          idMessage: inputs.message.id,
          reaction: inputs.reaction
        }
        this.reactMessage(donnees);
      }
    },
    editClick(message){
      this.stopAnswer();
      this.isEditing=true;
      this.editMessageId=message.id;
      this.inputMessage=message.content;

    },
    editionMessage(){
      let inputs;
      inputs = {
        idConv: this.conversation.id,
        idMessage: this.editMessageId,
        content:this.inputMessage
      }
      let promise = this.editMessage(inputs);

        promise.finally(() => {
          this.inputMessage = "";
          this.isEditing=false;
        });
    },
    getReactTitle(reaction){
      switch (reaction) {
        case "HEART":
          return "Aimer";
       
        case "THUMB":
          return "Pouce en l'air";
        
        case "HAPPY":
          return "Content"
         
        case "SAD":
          return "Pas content"
        
        default:
          return ""
      }
    },
    getReactClass(reaction){
      switch (reaction) {
        case "HEART":
          return "circular heart outline icon";
       
        case "THUMB":
          return "circular thumbs up outline icon";
        
        case "HAPPY":
          return "circular smile outline icon"
         
        case "SAD":
          return "circular frown outline icon"
        
        default:
          return ""
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    conversation(newConversation, oldConversation) {
      this.scrollBottom();
    }
  }
};
</script>

<style src="./Conversation.css" scoped />
